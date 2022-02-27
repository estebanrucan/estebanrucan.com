/* eslint-disable react/react-in-jsx-scope */
import ReactDom from "react-dom";
import App from "./App";
import { AppContextProvider } from "./App/context/Context";
import "./App/assets/styles/index.css";
import ScrollReveal from "scrollreveal";

ReactDom.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>, 
  document.getElementById("root")
);

const sr = ScrollReveal({
  origin  : "top",
  distance: "60px",
  duration: 2500,
  delay   : 400,
});

sr.reveal("#homeData");
sr.reveal("#homeHandle");
sr.reveal("#homeSocial, #homeScroll", {delay: 900, origin: "bottom"});
