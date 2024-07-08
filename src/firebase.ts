import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7N2TPbo93WKVJlp3Ss_dFPi_oCA5J0Sw",
  authDomain: "jwellry-store.firebaseapp.com",
  projectId: "jwellry-store",
  storageBucket: "jwellry-store.appspot.com",
  messagingSenderId: "263491067855",
  appId: "1:263491067855:web:1d431948ccc5150b263cba"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
