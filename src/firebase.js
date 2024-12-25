
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// import { get } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCli0pThKvEA1QY-eHgdIn65_V9-Wd4sv4",
  authDomain: "fileupload-c2acf.firebaseapp.com",
  projectId: "fileupload-c2acf",
  storageBucket: "fileupload-c2acf.firebasestorage.app",
  messagingSenderId: "571226228906",
  appId: "1:571226228906:web:948da7e47741c99444a8d3",
  measurementId: "G-3FDRDF854B"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);