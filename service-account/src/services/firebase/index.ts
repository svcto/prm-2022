import dotenv from 'dotenv';
import { initializeApp, FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import * as admin from 'firebase-admin';
import { IUser } from "@typesCustom";
//Carregar variaveis de ambiente
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID
};
const createUser = (user: IUser) => (admin.auth().createUser({
  email: user.email,
  emailVerified: true,
  password: user.password,
  displayName: user.name,
  disabled: false
}));
const getUser = (uid: string) => admin.auth().getUser(uid);
const updateUser = (uid: string, data: any) => admin.auth().updateUser(uid, data);
const deleteUser = (uid: string) => admin.auth().deleteUser(uid);

const listUsers = () => admin.auth().listUsers(1000);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Atutenticação
const signInAdmin = (email: string, password: string) => (signInWithEmailAndPassword(getAuth(), email, password));

export { FirebaseError, signInAdmin, listUsers, createUser, getUser, updateUser, deleteUser }