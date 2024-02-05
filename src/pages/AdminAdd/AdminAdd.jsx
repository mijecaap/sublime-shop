import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useFirestore } from "reactfire";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../components/Loader/Loader";

const AdminAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const firestore = useFirestore();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    const { image, name, price } = data;
    setIsLoading(true);
    try {
      // Subir la imagen a Firebase Storage
      const storage = getStorage();
      const imageName = uuidv4();
      const storageRef = ref(storage, "images/" + imageName);
      await uploadBytes(storageRef, image[0])
        .then(async (snapshot) => {
          // Obtener la URL de descarga de la imagen
          await getDownloadURL(storageRef)
            .then(async (url) => {
              // Guardar los datos en la colección "products" de Firestore
              const product = {
                name,
                price,
                imageUrl: url,
              };
              await addDoc(collection(firestore, "products"), product)
                .then(() => {})
                .catch((error) => {});
              // Limpiar el formulario después de enviar los datos
              reset();
              setIsLoading(false);
            })
            .catch((error) => console.log("Error getdownloadURL: ", error));
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error uploading a blob or file:", error);
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      setIsLoading(false);
    }
  };

  return !isLoading ? (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container mt-4 d-flex flex-column gap-4"
    >
      <div className="form-group">
        <label htmlFor="image">Imagen:</label>
        <input
          type="file"
          id="image"
          className="form-control"
          {...register("image", { required: true })}
        />
        {errors.image && (
          <span className="text-danger">Este campo es requerido</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          className="form-control"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className="text-danger">Este campo es requerido</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="price">Precio:</label>
        <input
          type="number"
          id="price"
          className="form-control"
          {...register("price", { required: true })}
        />
        {errors.price && (
          <span className="text-danger">Este campo es requerido</span>
        )}
      </div>

      <button type="submit" className="btn btn-primary mt-2">
        Guardar
      </button>
    </form>
  ) : (
    <Loader />
  );
};

export default AdminAdd;
