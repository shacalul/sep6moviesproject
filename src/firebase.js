// Import the functions you need from the SDKs you need

import { Movie } from "@mui/icons-material";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  child,
  get,
  getDatabase,
  push,
  ref,
  set,
  remove,
} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3XIzoowl2wVgwbKOkVivtd0yC-mNdk8w",
  authDomain: "semester6movies.firebaseapp.com",
  databaseURL:
    "https://semester6movies-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "semester6movies",
  storageBucket: "semester6movies.appspot.com",
  messagingSenderId: "320084724018",
  appId: "1:320084724018:web:ca74e529f5f411e755af2b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

export function getCurrentUser() {
  return getAuth(app).currentUser;
}
//initialize realtime database

export function writeUserData(userId, movieId) {
  const db = getDatabase();
  try {
    //const usersRef = ref(db, "users/" + userId + "/favorites");
    const usersRef = ref(db, "users/" + userId + "/favorites");
    const newFavorite = push(usersRef);
    set(newFavorite, movieId);

    // var list =  [movieId];
    // const arrays = ref(db,'arrays/');
    // const newArr=push(arrays);
    // set(newArr ,list);
  } catch (e) {
    console.trace(e);
  }
}
export function deleteUserData() {
  const db = getDatabase();
  try {
    return db.ref("favorites").child("ITEM_KEY").delete();
  } catch (e) {
    console.trace(e);
  }
}

//get array => [23,23,32,321,3]
//for each call find picture and actors and
//display data

//make one call to api like give all fav for userID
//display

export function getuserFavorites(userId) {
  const dbref = ref(getDatabase());

  return get(child(dbref, `users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val().favorites);
    } else {
      return "no data";
    }
  });
}
