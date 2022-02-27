import Headers from "./components/Head";
import AppHeader from "./components/AppHeader";
import NavBar from "./components/AppHeader/NavBar";
import Main from "./components/Main";
import Home from "./components/Main/Home";
import About from "./components/Main/About";
import Skills from "./components/Main/Skills";
import Services from "./components/Main/Services";
import Work from "./components/Main/Work";
import Contact from "./components/Main/Contact";
import AppFooter from "./components/AppFooter";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/Context";

function App() {

  const {
    inViewHome,
    inViewAbout,
    inViewSkills,
    inViewWork,
    inViewContact,
    setActiveLink,
    darkMode
  } = useContext(AppContext);


  useEffect(() => {
    darkMode 
      ? document.body.classList.remove("light-mode")
      : document.body.classList.add("light-mode");
  }, [darkMode]);

  useEffect(() => {

    if (inViewHome) {
      setActiveLink("#home");
    } else if (inViewAbout) {
      setActiveLink("#about");
    } else if (inViewSkills) {
      setActiveLink("#skills");
    } else if (inViewWork) {
      setActiveLink("#work");
    } else if (inViewContact) {
      setActiveLink("#contact");
    }

  }, [inViewHome, inViewAbout, inViewSkills, inViewWork, inViewContact]);


  return (
    <>
      <Headers />
      <AppHeader>
        <NavBar />
      </AppHeader>
      <Main>
        <Home />
        <About />
        <Skills />
        <Services />
        <Work/>
        <Contact />
      </Main>
      <AppFooter />
    </>
  );
}

export default App;
