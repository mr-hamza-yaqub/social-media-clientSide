import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import store from "./Redux/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // HAshRouter and Browser Router are Little Bit Same
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);
