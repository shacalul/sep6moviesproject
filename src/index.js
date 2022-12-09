import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { writeUserData } from "./firebase";

const root = ReactDOM.createRoot(document.getElementById("root"));

//writeUserData("1", "224");



root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
