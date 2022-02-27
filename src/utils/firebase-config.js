//everything to deal with connecting to firebase
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider,getAuth,signInWithPopup,signInWithEmailAndPassword,
    createUserWithEmailAndPassword,sendPasswordResetEmail,signOut} from "firebase/auth";
import {query,getDocs,collection,where,addDoc,updateDoc,doc} from "firebase/firestore";

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

const registerWithEmailAndPassword = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      console.log(user.uid);
      /*alert(user.uid);
      alert("writing in user database");*/
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

const getValUserDocUid = async (tosearchuser) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", tosearchuser));
    const doc = await getDocs(q);
    return doc.docs[0].id
  } catch (error) {
    console.error(error);
  }
};

const updateValUserInfo = async (docid,toupdatedict) => {
  try {
    var docreference = doc(db,"users",docid)
    console.log(docid);
    console.log(toupdatedict);
    updateDoc(docreference,toupdatedict);
  } catch (error) {
    console.error(error);
  }
};

const getValUserCredentials = async (tosearchuser) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", tosearchuser));
    const doc = await getDocs(q);
    const data = doc.docs[0].data().type_user;
    return data
  } catch (error) {
    console.error(error);
    return "error";
  }
};

const getValUserInfo = async (tosearchuser) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", tosearchuser));
    const doc = await getDocs(q);
    const data = doc.docs[0].data();
    return data
  } catch (error) {
    console.error(error);
  }
};

const valUserExists = async (tosearchuser) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", tosearchuser));
    const doc = await getDocs(q);
    const data = doc.docs[0].data();
    console.log(data);
    return true
  } catch (err) {
    console.error(err);
    return false
  }
};

const createValorantUser = async (NewValorantName,NewTag,mailuid) => {
  try {
    await addDoc(collection(db, "users"), 
    { type_user:"user",
      valorant_name:NewValorantName,
      valorant_tag:NewTag,
      uid:mailuid}
      )
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

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
    createValorantUser,
    valUserExists,
    getValUserDocUid,
    getValUserInfo,
    updateValUserInfo,
    getValUserCredentials
  };