import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth, useFirestore } from "reactfire";
import Loader from "../../components/Loader/Loader";

const Auth = () => {
  const navigate = useNavigate();
  const { register: login, handleSubmit: loginSubmit } = useForm();
  const { register: signin, handleSubmit: registerSubmit } = useForm();
  const auth = useAuth();
  const firestore = useFirestore();
  const [isLoading, setIsLoading] = useState(false);

  const logIn = (d) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, d.email, d.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setIsLoading(false);
          if (data.isAdmin) navigate("/admin/orders");
          else navigate("/home");
        } else {
          console.log("No such document!");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setIsLoading(false);
      });
  };

  const createAccount = (d) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, d.email, d.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const bodyUser = {
          ...d,
          uid: user.uid,
          photoURL: user.photoURL,
          creationTime: user.metadata.creationTime,
          isAdmin: false,
          address: [],
        };
        await setDoc(doc(firestore, "users", user.uid), bodyUser)
          .then(() => {
            setIsLoading(false);
            navigate("/home");
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  if (isLoading) return <Loader />;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <form
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
        onSubmit={loginSubmit(logIn)}
      >
        <div>INICIAR SESIÓN</div>
        <div>
          <div>Correo</div>
          <input {...login("email")} type="text" style={{ width: "100%" }} />
        </div>
        <div>
          <div>Contraseña</div>
          <input
            {...login("password")}
            type="password"
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <input
            type="submit"
            value={"Iniciar Sesión"}
            style={{
              backgroundColor: "#ffb410",
              padding: "12px 20px",
              textAlign: "center",
              width: "100%",
              outline: "none",
              border: "none",
            }}
          />
        </div>
      </form>
      <form
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
        onSubmit={registerSubmit(createAccount)}
      >
        <div>CREAR CUENTA</div>
        <div>
          <div>Nombre</div>
          <input {...signin("name")} type="text" style={{ width: "100%" }} />
        </div>
        <div>
          <div>Correo</div>
          <input {...signin("email")} type="text" style={{ width: "100%" }} />
        </div>
        <div>
          <div>Contraseña</div>
          <input
            {...signin("password")}
            type="password"
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <input
            type="submit"
            value={"Crear Cuenta"}
            style={{
              backgroundColor: "#ffb410",
              padding: "12px 20px",
              textAlign: "center",
              width: "100%",
              outline: "none",
              border: "none",
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default Auth;
