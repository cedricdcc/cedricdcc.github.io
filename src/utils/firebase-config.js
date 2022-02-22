//everything to deal with connecting to firebase
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider,getAuth,signInWithPopup,signInWithEmailAndPassword,
    createUserWithEmailAndPassword,sendPasswordResetEmail,signOut} from "firebase/auth";
import {query,getDocs,collection,where,addDoc} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAgU28v6rjbJVG_M6hYeV87_xIYc4Tq6BA",
    authDomain: "impulsiveempathyvalorant.firebaseapp.com",
    databaseURL: "https://impulsiveempathyvalorant-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "impulsiveempathyvalorant",
    storageBucket: "impulsiveempathyvalorant.appspot.com",
    messagingSenderId: "198333170985",
    appId: "1:198333170985:web:5991869afbc6bf14d9a338",
    measurementId: "G-0VKEFW8H4M"
  };

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: user.displayName,
            authProvider: "google",
            email: user.email,
        });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
      console.log("about to send email");
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
      console.log("email send");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    sendPasswordResetEmail,
    logout,
  };