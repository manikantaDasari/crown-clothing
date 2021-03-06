import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config={
    apiKey: "AIzaSyBqmUUNx9hcqdptBKxudY7s2BvIINcTUD8",
    authDomain: "crown-clothing-dcb1e.firebaseapp.com",
    databaseURL: "https://crown-clothing-dcb1e.firebaseio.com",
    projectId: "crown-clothing-dcb1e",
    storageBucket: "crown-clothing-dcb1e.appspot.com",
    messagingSenderId: "1000436538892",
    appId: "1:1000436538892:web:31f14c2cb4895c90fe5829",
    measurementId: "G-4PSPZMLJ5J"
  };

  export const updateUserProfileDoc= async(userAuth, additionalData)=>{

    if(!userAuth) return;

    const userRef=  firestore.doc(`users/${userAuth.uid}`);
    const snapShot= await userRef.get();
      if(!snapShot.exists){
        const{displayName, email}= userAuth;
        const createdAt= new Date();

        try {

          await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
          })
          
        } catch (error) {
          console.log('error in creating user', error.message);
          
          
        }

      }

      return userRef;
      
    }

   

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore= firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:"select_account"});

  export const signInWithGoogle= ()=> auth.signInWithPopup(provider);

  export default firebase;