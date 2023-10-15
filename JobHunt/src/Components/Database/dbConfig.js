import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage, ref} from "firebase/storage";

const firebaseConfig = {
    /// Initialize Firebase
        apiKey: "AIzaSyD0_pusdiUH6vUMV2cicyVJdWZQQKzbgm4",
        authDomain: "job-hunt-project-6f317.firebaseapp.com",
        projectId: "job-hunt-project-6f317",
        storageBucket: "job-hunt-project-6f317.appspot.com",
        messagingSenderId: "823132327320",
        appId: "1:823132327320:web:17b4c2ec7cb69582e66fed",
        measurementId: "G-L1XY2ZJ0KM"
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp); // Initialize Firestore
const storage = getStorage(firebaseApp); //initiate Storage for file upload
//console.log("my db:",db)
export { auth, db ,storage,ref}; // Export the Firestore instance as well 
