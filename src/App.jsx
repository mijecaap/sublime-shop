import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import {
  AuthProvider,
  FirestoreProvider,
  StorageProvider,
  useFirebaseApp,
} from "reactfire";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loader from "./components/Loader/Loader";
import { getStorage } from "firebase/storage";
import AppRouter from "./routers/AppRouter";

const App = () => {
  const firebaseApp = useFirebaseApp();
  const firestoreInstance = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const storage = getStorage(firebaseApp);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <StorageProvider sdk={storage}>
        <AuthProvider sdk={auth}>
          <Provider store={store}>
            {!isLoading ? <AppRouter auth={auth} /> : <Loader />}
          </Provider>
        </AuthProvider>
      </StorageProvider>
    </FirestoreProvider>
  );
};

export default App;
