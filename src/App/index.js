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

function App() {

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
        <Work />
        <Contact />
      </Main>
      <AppFooter />
    </>
  );
}

export default App;
