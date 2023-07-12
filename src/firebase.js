// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSciwU9D9GRW6EuamjxKugDGk3wHKT5PI",
  authDomain: "spring-boot-product-list-fe.firebaseapp.com",
  projectId: "spring-boot-product-list-fe",
  storageBucket: "spring-boot-product-list-fe.appspot.com",
  messagingSenderId: "439179502340",
  appId: "1:439179502340:web:dba5d05b8db8aecb666651"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)