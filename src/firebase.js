// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase, push, ref, set} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3XIzoowl2wVgwbKOkVivtd0yC-mNdk8w",
  authDomain: "semester6movies.firebaseapp.com",
  databaseURL: "https://semester6movies-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "semester6movies",
  storageBucket: "semester6movies.appspot.com",
  messagingSenderId: "320084724018",
  appId: "1:320084724018:web:ca74e529f5f411e755af2b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

//initialize realtime database

export function writeUserData(userId, movieId)
{
  const db = getDatabase();
  try{
    const usersRef = ref(db,'users/'+userId+'/favourites');
    const newFavorite=push(usersRef);
    set(newFavorite ,movieId);

    // var list =  [movieId];
    // const arrays = ref(db,'arrays/');
    // const newArr=push(arrays);
    // set(newArr ,list);
    
  }catch(e){
    console.trace(e);
    
  }


}


