import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  setPersistence,
  browserSessionPersistence
} from "firebase/auth";
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import {toast} from 'react-toastify'

const firebaseConfig = {
  apiKey: "AIzaSyALVwGa81ciMxUxcqGchJelEIFnYQ4g9PY",
  authDomain: "netflix-clone-8f33f.firebaseapp.com",
  projectId: "netflix-clone-8f33f",
  storageBucket: "netflix-clone-8f33f.firebasestorage.app",
  messagingSenderId: "172234102251",
  appId: "1:172234102251:web:f20d2c0777492a67db35ae",
  measurementId: "G-S21CG541Y5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


setPersistence(auth, browserSessionPersistence)
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    
    await addDoc(collection(db, "users"), {  
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    
    return { success: true, user };
  } catch (error) {
    console.error("Signup error:", error);
    toast.error(error.code.split('/')[1].split('-').join(" ")) 
  }
};

const login = async (email, password) => {  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error("Login error:", error);
    toast.error(error.code.split('/')[1].split('-').join(" ")) 
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    toast.error(error.code.split('/')[1].split('-').join(" ")) 
  }
};

export { auth, db, login, signup, logout };