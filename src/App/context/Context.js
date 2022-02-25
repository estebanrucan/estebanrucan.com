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

  const defaultRootMargin = "-10%";

  const { ref: refHome, inView: inViewHome } = useInView({
    /* Optional options */
    rootMargin: defaultRootMargin
  });

  const { ref: refAbout, inView: inViewAbout } = useInView({
    /* Optional options */
    rootMargin: defaultRootMargin
  });

  const { ref: refSkills, inView: inViewSkills } = useInView({
    /* Optional options */
    rootMargin: defaultRootMargin
  });

  const { ref: refWork, inView: inViewWork } = useInView({
    /* Optional options */
    rootMargin: defaultRootMargin
  });

  const { ref: refContact, inView: inViewContact } = useInView({
    /* Optional options */
    rootMargin: defaultRootMargin
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
    setCurrentWorkCategory,
    // Active Section
    refHome,
    inViewHome,
    refAbout,
    inViewAbout,
    refSkills,
    inViewSkills,
    refWork,
    inViewWork,
    refContact,
    inViewContact
  };

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  );
}

export {AppContext, AppContextProvider};