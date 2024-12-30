// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHRIWrgAs_wNsy40P3gfUXmxeUckYw_wg",
  authDomain: "image-bucket-53496.firebaseapp.com",
  projectId: "image-bucket-53496",
  storageBucket: "image-bucket-53496.appspot.com",
  messagingSenderId: "888011642497",
  appId: "1:888011642497:web:4b767b364de5d473a09f80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
