// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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

export async function writeUserData(userId, movieId) {
  const db = getDatabase();
  const data = await getuserFavorites(userId);
  let found = false;
  for (const element of data) {
    if (element === movieId) {
      found = true;
      break;
    }
  }

  if (!found) {
    try {
      const usersRef = ref(db, "users/" + userId + "/favorites");
      const newFavorite = push(usersRef);
      set(newFavorite, movieId);
    } catch (e) {
      console.trace(e);
    }
  }
}

export async function deleteUserData(userId, movieId) {
  const dbref = ref(getDatabase());

  get(child(dbref, `users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      var myKey;
      const entries = Object.entries(snapshot.val().favorites);
      for (const [key, value] of entries) {
        // Check if the value is equal to 55
        if (value === movieId) {
          // The key for the value 55 is:

          myKey = key;
        }
      }
      if (myKey !== undefined) {
        const usersRef = ref(getDatabase(), "users/" + userId + "/favorites");
        remove(child(usersRef, myKey));
      }
    }
  });
}

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
