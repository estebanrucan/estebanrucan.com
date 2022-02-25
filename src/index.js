/* eslint-disable react/react-in-jsx-scope */
import ReactDom from "react-dom";
import App from "./App";
import { AppContextProvider } from "./App/context/Context";
import "./assets/styles/index.css";

ReactDom.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>, 
  document.getElementById("root")
);