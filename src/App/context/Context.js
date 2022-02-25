import { createContext, useState } from "react";
import { useInView } from "react-intersection-observer";



const AppContext = createContext({});

function AppContextProvider({ children }) {
  const [activeLink, setActiveLink] = useState("#home");
  const [darkMode, setDarkMode] = useState(true);

  const { ref, inView } = useInView({
    /* Optional options */
    rootMargin: "-10%"
  });

  const [servicesModalDisplay, setServicesModalDisplay] = useState(false);
  const [servicesModalContent, setServicesModalContent] = useState({
    title: "",
    description: "",
    content: []
  });

  const [currentWorkCategory, setCurrentWorkCategory] = useState("Todos");

  const values = {
    activeLink,
    setActiveLink,
    darkMode,
    setDarkMode,
    ref,
    inView,
    servicesModalDisplay,
    setServicesModalDisplay,
    servicesModalContent,
    setServicesModalContent,
    currentWorkCategory, 
    setCurrentWorkCategory
  };

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  );
}

export {AppContext, AppContextProvider};