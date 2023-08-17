import { StyledButton, StyledSectionSubtitle, StyledSectionTitle } from "../../../assets/styles";
import { StyledAbout, StyledAboutContainer, StyledAboutData, StyledAboutDescription, StyledAboutIconStats, StyledAboutIconBriefcase, StyledAboutIconTeacher, StyledAboutImg, StyledAboutInfo } from "./styles";
import aboutImg from "../../../assets/img/about.png";
import AboutBox from "./Box";
import { useContext } from "react";
import { AppContext } from "../../../context/Context";


function About() {

  const {refAbout, darkMode} = useContext(AppContext);

  const INFO = [
    ["Estadístico UC", "Conocimientos sólidos en estadística",   <StyledAboutIconStats key={1} />],
    ["Data Scientist", "Experiencia en DataUC y Entel S.A.",    <StyledAboutIconBriefcase key={2} />],
    ["Docente", "En el Diplomado en Data Science UC",   <StyledAboutIconTeacher key={3} />],

  ];


  return ( 
    <StyledAbout id="about" ref={refAbout}>
      <StyledSectionSubtitle darkMode={darkMode}>Presentación</StyledSectionSubtitle>
      <StyledSectionTitle>Sobre mí</StyledSectionTitle>

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
          ¡Hola! Soy Esteban Rucán, estudiante de magíster en ciencia de datos UC, estadístico UC y docente. Con experiencia en Entel S.A. y DataUC, aplico estadística e inteligencia artificial para descubrir insights en los datos. Como docente, guío a futuros científicos de datos. Manejo Python y R con un fuerte fundamento en estadística, lo que me permite explorar y comunicar en el mundo de los datos. Mi motivación es la curiosidad y el deseo de impactar a través de la ciencia de datos.
          </StyledAboutDescription>

          <StyledButton href="#contact" darkMode={darkMode}>Contáctame</StyledButton>

        </StyledAboutData>
      </StyledAboutContainer>
    </StyledAbout>
  );
}

export default About;