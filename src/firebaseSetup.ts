import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {Firestore, getFirestore} from "firebase/firestore"


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_KEY,
    authDomain: "tsx-test-project.firebaseapp.com",
    projectId: "tsx-test-project",
    storageBucket: "tsx-test-project.appspot.com",
    messagingSenderId: "66014597139",
    appId: "1:66014597139:web:6329cc6b9e86d178abafe6"
}; 

firebase.initializeApp(firebaseConfig);
console.log(process.env)

export const auth = firebase.auth();
export const db = getFirestore();
