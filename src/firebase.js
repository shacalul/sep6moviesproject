// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { child, get, getDatabase, push, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN_FIREBASE,
  databaseURL: process.env.REACT_APP_DATABASE_URL_FIREBASE,
  projectId: process.env.REACT_APP_PROJECT_ID_FIREBASE,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET_FIREBASE,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_FIREBASE,
  appId: process.env.REACT_APP_ID_FIREBASE,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

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


