import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCRzpDQvgCZRY2-DmrsrZEp33xPVVrrUQ8",
    authDomain: "react-todo-app-1ca1e.firebaseapp.com",
    projectId: "react-todo-app-1ca1e",
    storageBucket: "react-todo-app-1ca1e.appspot.com",
    messagingSenderId: "603948433118",
    appId: "1:603948433118:web:b0aca8fcfc7972417d4c4f"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };