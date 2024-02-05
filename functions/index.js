const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const admin = require("firebase-admin");
const { initializeApp } = require("firebase-admin/app");
const { FieldValue } = require("firebase-admin/firestore");

const stripe = require("stripe")(
  "sk_test_51M1fKmB5sgSple9rgN8iB3UDIT6MSCnsc06mFeAhWoyTYnud1oey8jcYANF7u55fNbHL6U3fYbSNYZ0ujPSM35fa00XvK5QjnV"
);

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

initializeApp();

exports.handlePayment = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const token = req.body.token;
    const amount = req.body.amount;
    const currency = req.body.currency;
    const userId = req.body.userId;
    const address = req.body.address;
    const items = req.body.items;
    const itemsCustomize = req.body.itemsCustomize;

    // Procesa el pago con Stripe
    stripe.charges
      .create({
        amount: amount,
        currency: currency,
        source: token,
      })
      .then((charge) => {
        // Pago exitoso
        // Guardar información en Firestore
        const firestore = admin.firestore();
        const paymentData = {
          orderId: charge.id,
          userId: userId,
          totalAmount: charge.amount / 100,
          currency: charge.currency,
          items: items,
          itemsCustomize: itemsCustomize,
          status: "creado",
          timestamp: admin.firestore.Timestamp.now(),
        };

        // Aquí puedes especificar la colección y el documento donde deseas guardar los datos
        const collectionRef = firestore.collection("orders");
        const documentRef = collectionRef.doc();

        // Verifica si la dirección no es un objeto vacío
        if (address && Object.keys(address).length > 0) {
          // Guarda la dirección en la colección "users"
          const usersCollectionRef = firestore.collection("users");
          const userDocumentRef = usersCollectionRef.doc(userId);

          // Actualiza el campo "address" con el nuevo valor de dirección
          return userDocumentRef
            .update({
              address: FieldValue.arrayUnion(address),
            })
            .then(() => {
              // Guarda el pago en la colección "orders"
              return documentRef.set(paymentData);
            });
        } else {
          // Guarda el pago en la colección "orders" sin modificar el campo "address"
          return documentRef.set(paymentData);
        }
      })
      .then((documentId) => {
        // Guardado exitoso en Firestore
        res.status(200).send({ success: true });
      })
      .catch((error) => {
        // Error en el pago
        console.log(error);
        res.status(500).send({ success: false });
      });
  });
});

exports.handleImage = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const prompt = req.body.prompt;

    // Procesa la imagen aquí
    openai
      .createImage({
        prompt: prompt,
        n: 4,
        size: "512x512",
      })
      .then((response) => {
        // Imagen generada exitosamente
        res.status(200).send({ success: true, data: response.data.data });
      })
      .catch((error) => {
        // Error al generar la imagen
        console.log(error);
        res.status(500).send({ success: false });
      });
  });
});

exports.handleUploadImage = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const imageUrl = req.body.imageUrl;

    // Verificar si la URL de la imagen es válida y segura
    if (!imageUrl.startsWith("https://oaidalleapiprodscus.blob.core.windows.net/private/")) {
      res.status(400).json({ error: "URL de imagen no válida" });
      return;
    }

    // Descargar la imagen y subirla a Firebase Storage
    const bucket = admin.storage().bucket();
    const imageFileName = `${uuidv4()}.jpg`;
    const file = bucket.file(`images/${imageFileName}`);

    const downloadAndUploadImage = async (imageUrl, file) => {
      try {
        const response = await axios.get(imageUrl, { responseType: "stream" });

        // Subir la imagen al archivo en Firebase Storage
        const writeStream = file.createWriteStream();
        response.data.pipe(writeStream);

        return new Promise((resolve, reject) => {
          writeStream.on("finish", resolve);
          writeStream.on("error", reject);
        });
      } catch (error) {
        console.error("Error al descargar y subir la imagen:", error);
        throw new Error("Error al descargar y subir la imagen");
      }
    };

    downloadAndUploadImage(imageUrl, file)
      .then(() => {
        // Una vez que la imagen se haya subido correctamente, hacer que el archivo sea público
        return file.makePublic();
      })
      .then(() => {
        // Obtener la URL de descarga pública
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

        res.status(200).json({ imageUrl: publicUrl });
      })
      .catch((error) => {
        console.error("Error al manejar la carga de imagen:", error);
        res.status(500).json({ error: "Error al manejar la carga de imagen" });
      });
  });
});
