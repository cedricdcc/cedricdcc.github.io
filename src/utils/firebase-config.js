//everything to deal with connecting to firebase
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider,getAuth,signInWithPopup,signInWithEmailAndPassword,
    createUserWithEmailAndPassword,sendPasswordResetEmail,signOut} from "firebase/auth";
import {query,getDocs,collection,where,addDoc,updateDoc,doc,deleteDoc,orderBy} from "firebase/firestore";

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

const addtoqueue = async (user) => {
  try {
    await addDoc(collection(db, "queue"), 
    { 
      name:user,
      time:Date.now()
    }
      )
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const deletefromqueue = async (user) => {
  try {
    //get docref queue with name == user
    const q = query(collection(db, "queue"), where("name", "==", user));
    const doco = await getDocs(q);
    const id_to_delete = doco.docs[0].id;
    const docref_delete = doc(db,"queue",id_to_delete)
    await deleteDoc(docref_delete)
    return false
  } catch (error) {
    console.log(error)
    return true
  }
}

const bumptofirst = async (user) => {
  /* 
  1: get docid of the user to update
  2: get docid of the first in queue
  3: get time of person in first queue
  4: change time to be less then the person first in queue
   */
  console.log(user);
  const q = query(collection(db, "queue"), where("name", "==", user));
  const doco = await getDocs(q);
  const id_to_change = doco.docs[0].id;
  const docref_change = doc(db,"queue",id_to_change)

  const qt = query(collection(db,"queue"), orderBy("time", "asc"));
  const docot = await getDocs(qt);
  const to_get_time = docot.docs[0].data().time;
  
  const toupdatetime = to_get_time - 1;
  updateDoc(docref_change,{"name":user,"time":toupdatetime});

}

const deletefrommatch = async(user,team) => {
  const q = query(collection(db, "current_match"));
  const current_match_doc = await getDocs(q);

  //get next in line queue
  const qnil = query(collection(db,"queue"), orderBy("time", "asc"));
  const current_queue = await getDocs(qnil);
  const replac_user = current_queue.docs[0].data().name;
  const current_match = current_match_doc.docs[0].data();
  console.log(current_match_doc.docs[0].id);
  const docref_change = doc(db,"current_match",current_match_doc.docs[0].id)
  const replacement_user = {"name":replac_user,"anchored":false}
  if(team == "blue"){
    const usersteam = current_match_doc.docs[0].data().team_blue
    const index = usersteam.findIndex(x => x.name ===user.name);
    console.log(index);
    if (index > -1) {
      usersteam.splice(index, 1); 
    }
    usersteam.push(replacement_user)
    console.log(usersteam);
    // update current_match
    current_match.team_blue = usersteam;
    // update record of current_match
    updateDoc(docref_change,current_match);
  }else{
    const usersteam = current_match_doc.docs[0].data().team_red
    const index = usersteam.findIndex(x => x.name ===user.name);
    if (index > -1) {
      usersteam.splice(index, 1);
    }
    usersteam.push(replacement_user)
    // update current_match
    current_match.team_red = usersteam;
    updateDoc(docref_change,current_match);
  }
  
  //lastly delete replacement user from queue
  await deletefromqueue(replac_user);

}

const bottomqueuereplaceteam = async(team) => {
  //get all the members from the team
  const q = query(collection(db, "current_match"));
  const current_match_doc = await getDocs(q);
  const current_match = current_match_doc.docs[0].data();
  const docref_change = doc(db,"current_match",current_match_doc.docs[0].id)
  if(team == "blue"){
    const usersteam = current_match_doc.docs[0].data().team_blue
    for (let i = 0; i < usersteam.length; i++) {
      console.log(usersteam[i].anchored);
      if(usersteam[i].anchored == false){
        await deletefrommatch(usersteam[i],team);
        await addtoqueue(usersteam[i].name);
      }
    }
  }else{
    const usersteam = current_match_doc.docs[0].data().team_red
    for (let i = 0; i < usersteam.length; i++) {
      console.log(usersteam[i]);
      console.log(team);
      if(usersteam[i].anchored == false){
        console.log(usersteam[i]);
        await deletefrommatch(usersteam[i],team);
        await addtoqueue(usersteam[i].name);
      }
    }
  }
}

const changeanchoruser = async(user,team) => {
  const q = query(collection(db, "current_match"));
  const current_match_doc = await getDocs(q);
  const current_match = current_match_doc.docs[0].data();
  const docref_change = doc(db,"current_match",current_match_doc.docs[0].id)
  if(team == "blue"){
    const usersteam = current_match_doc.docs[0].data().team_blue
    const index = usersteam.findIndex(x => x.name ===user.name);
    console.log(usersteam[index].anchored);
    if(usersteam[index].anchored === true){
      usersteam[index].anchored = false
    }else{
      usersteam[index].anchored = true
    }
    current_match.team_blue = usersteam;
    // update record of current_match
    updateDoc(docref_change,current_match);
  }else{
    const usersteam = current_match_doc.docs[0].data().team_red
    console.log(usersteam);
    const index = usersteam.findIndex(x => x.name ===user.name);
    console.log(usersteam[index].anchored);
    if(usersteam[index].anchored === true){
      usersteam[index].anchored = false
    }else{
      usersteam[index].anchored = true
    }
    current_match.team_red = usersteam;
    // update record of current_match
    updateDoc(docref_change,current_match);
  }
}

const replacefrommatch = async(user,team) => {
  await deletefrommatch(user,team);
  await addtoqueue(user.name);
  await bumptofirst(user.name);
}

const bottomqueuereplacefrommatch = async(user,team) => {
  await deletefrommatch(user,team);
  await addtoqueue(user.name);
}

const modplayself = async(user) => {
  const qu = query(collection(db, "users"), where("uid", "==", user));
  const docus = await getDocs(qu);
  const data = docus.docs[0].data();
  const replacement_user = data.valorant_name;
  const q = query(collection(db, "current_match"));
  const current_match_doc = await getDocs(q);
  const current_match = current_match_doc.docs[0].data();
  const docref_change = doc(db,"current_match",current_match_doc.docs[0].id)
  const usersteam = current_match_doc.docs[0].data().team_blue
  const toreplaceuser = current_match_doc.docs[0].data().team_blue[0]
  const index = usersteam.indexOf(toreplaceuser);
  if (index > -1) {
    usersteam.splice(index, 1); 
  }
  usersteam.push(replacement_user)
  console.log(usersteam);
  // update current_match
  current_match.team_blue = usersteam;
  // update record of current_match
  updateDoc(docref_change,current_match);
  await addtoqueue(toreplaceuser);
  await bumptofirst(toreplaceuser);
}




const isUserInQueue = async (user) => {
  const q = query(collection(db, "queue"), where("name", "==", user));
  const doc = await getDocs(q);
  console.log(doc.docs.length);
  if (doc.docs.length == 0){
    return false
  }
  else{
    return true
  }
}

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
    getValUserCredentials,
    isUserInQueue,
    addtoqueue,
    deletefromqueue,
    bumptofirst,
    deletefrommatch,
    replacefrommatch,
    modplayself,
    bottomqueuereplacefrommatch,
    changeanchoruser,
    bottomqueuereplaceteam
  };