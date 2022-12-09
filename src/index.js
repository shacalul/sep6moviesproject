import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { writeUserData, getuserFavorites } from "./firebase";

const root = ReactDOM.createRoot(document.getElementById("root"));

// writeUserData("1", "22");
// console.log(getuserFavorites("1"));
// getuserFavorites("1").then((res) => console.log(res));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
