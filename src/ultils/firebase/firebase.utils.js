import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {getAuth,signInWithRedirect,signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,GoogleAuthProvider,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {getFirestore,doc,getDoc,setDoc,collection,writeBatch,query,getDocs} from 'firebase/firestore'
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
export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) => {
    const collectionRef = collection(db,collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef,object)
    });
    await batch.commit();
    console.log('done');
}

export const getCategoriesANdDocuments = async () => {
    const collectionRef = collection(db,'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
   const categoryMap =  querySnapshot.docs.reduce( (acc,docSnapshot) => {
        const {title, items} =   docSnapshot.data();
      
        acc[title.toLowerCase()] = items;
        return acc;

   },{} );

   return categoryMap;

}

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

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(
    auth,callback);