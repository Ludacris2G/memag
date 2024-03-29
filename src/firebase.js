import { initializeApp } from 'firebase/app';
import { 
    getFirestore,
    addDoc,
    doc,
    setDoc,
    collection,
    getDoc,
    getDocs,
    query,
    orderBy
 } from 'firebase/firestore/lite';
import { 
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

const logOut = () => {
    signOut(auth);
}

export { auth, db, logOut, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, addDoc, collection, doc, setDoc, getDoc, getDocs, query, orderBy };
