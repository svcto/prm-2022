import { FirebaseError, initializeApp } from "firebase/app";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import dotenv from 'dotenv';
// import routes from './router';
// instanciando a aplicação express

dotenv.config();

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const signInAdmin = (email: string, password: string) => (signInWithEmailAndPassword(getAuth(), email, password));
export {FirebaseError, signInAdmin}