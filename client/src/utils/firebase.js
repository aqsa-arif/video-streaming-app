import { initializeApp } from "firebase/app"; 
import { getAuth, GoogleAuthProvider } from "firebase/auth";  
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "clone-2b8d6.firebaseapp.com",
  projectId: "clone-2b8d6",
  storageBucket: "clone-2b8d6.appspot.com",
  messagingSenderId: "519675382688",
  appId: "1:519675382688:web:40af10382a850d4384f2c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//For download 
export const storage = getStorage(app);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;