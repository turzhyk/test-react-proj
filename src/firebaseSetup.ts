import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {Firestore, getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAQG7fcQp_0Y8zT9sjosFPvT5bTseksN0c",
    authDomain: "tsx-test-project.firebaseapp.com",
    projectId: "tsx-test-project",
    storageBucket: "tsx-test-project.appspot.com",
    messagingSenderId: "66014597139",
    appId: "1:66014597139:web:6329cc6b9e86d178abafe6"
}; 

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = getFirestore();
