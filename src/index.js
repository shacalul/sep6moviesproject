import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { writeUserData, getuserFavorites, getUserId} from "./firebase";

const root = ReactDOM.createRoot(document.getElementById("root"));

 //writeUserData(getUserId(), "22");
// console.log(getuserFavorites("1"));
// getuserFavorites("1").then((res) => console.log(res));
//console.log(user.uid);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
