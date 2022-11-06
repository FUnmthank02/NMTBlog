import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "blog-prj-52a10.firebaseapp.com",
    projectId: "blog-prj-52a10",
    storageBucket: "blog-prj-52a10.appspot.com",
    messagingSenderId: "299167535035",
    appId: "1:299167535035:web:c15a5cf6e99992aa44be9e",
    measurementId: "G-ZJ61GRNQWR"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);
