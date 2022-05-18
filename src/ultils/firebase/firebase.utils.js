

import { initializeApp } from "firebase/app";
import {getAuth,signInWithRedirect,signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,GoogleAuthProvider } from 'firebase/auth'
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCvb9NuAXuGa5nR4L5wzUEWp1RuK0fDHWE",
  authDomain: "crwn-shop-2c0f3.firebaseapp.com",
  projectId: "crwn-shop-2c0f3",
  storageBucket: "crwn-shop-2c0f3.appspot.com",
  messagingSenderId: "526983052835",
  appId: "1:526983052835:web:142d9d609327f5a577bb96"
};


const firebaseapp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth, additionalInformation) => {
    if(!userAuth) return;
  
    const userDocRef = doc(db, 'users',userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    console.log(userSnapshot)

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createAt = new Date();
        try {
            await setDoc(userDocRef, {
                 displayName,email,createAt,...additionalInformation
            });
        }
        catch (error){
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
 
}

export const createAuthUserWithEmailAndPassWord = async (email,password) => {
    if(!email || !password) return;
  return  await  createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassWord = async (email,password) => {
    if(!email || !password) return;
  return  await  signInWithEmailAndPassword(auth, email, password);
}