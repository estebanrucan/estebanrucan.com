import { StyledButton, StyledSectionSubtitle, StyledSectionTitle } from "../../../../assets/styles";
import { StyledAbout, StyledAboutContainer, StyledAboutData, StyledAboutDescription, StyledAboutIconAward, StyledAboutIconBriefcase, StyledAboutIconTrophy, StyledAboutImg, StyledAboutInfo } from "./styles";
import aboutImg from "../../../../assets/img/about.png";
import AboutBox from "./Box";
import { useContext } from "react";
import { AppContext } from "../../../context/Context";


function About() {

  const {refAbout, darkMode} = useContext(AppContext);

  const INFO = [
    ["Certificaciones", "D. Science, HTML y Backend",   <StyledAboutIconAward key={1} />],
    ["Ayudantías", "13 Pregrado / 4 Posgrado",    <StyledAboutIconBriefcase key={2} />],
    ["Liderazgo", "Consejero Académico 2021",   <StyledAboutIconTrophy key={3} />],

  ];


  return ( 
    <StyledAbout id="about" ref={refAbout}>
      <StyledSectionSubtitle darkMode={darkMode}>Presentación</StyledSectionSubtitle>
      <StyledSectionTitle>Sobre mi</StyledSectionTitle>

      <StyledAboutContainer>
        <StyledAboutImg src={aboutImg}/>

        <StyledAboutData>

          <StyledAboutInfo>
            {
              INFO.map(([title, subtitle, icon]) => (
                <AboutBox 
                  key={title}
                  title={title}
                  subtitle={subtitle}
                  icon={icon}
                />
              ))
            }
          </StyledAboutInfo>

          <StyledAboutDescription>
          Soy Esteban Rucán, estudiante en último año de Estadística en la Pontificia Universidad Católica de Chile. Me gusta innovar a través de distintas herramientas como las Ciencias de Datos, Aprendizaje Profundo y Desarrollo Web. Además, me gusta compartir mis conocimientos y ser una fuente de inspiración.
          </StyledAboutDescription>

          <StyledButton href="#contact" darkMode={darkMode}>Contáctame</StyledButton>

        </StyledAboutData>
      </StyledAboutContainer>
    </StyledAbout>
  );
}

export default About;