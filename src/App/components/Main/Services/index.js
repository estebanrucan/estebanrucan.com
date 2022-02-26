import { StyledSectionSubtitle, StyledSectionTitle } from "../../../../assets/styles";
import ServicesCard from "./Card";
import ServicesModal from "./Modal";
import { StyledServicesContainer, StyledServicesSection } from "./styles";
import { useContext } from "react";
import { AppContext } from "../../../context/Context";

function Services() {

  const {darkMode} = useContext(AppContext);

  const INFO = [
    [
      "Data Science", 
      "A través de distintas técnicas y software, entregar valor y uso a la información disponible.",
      [
        "Tecnológias a la vanguardia.",
        "Análisis de datos automatizado.",
        "Descubrimiento de patrones.",
        "Visualizaciones informativas para todo público.",
        "Modelamiento riguroso de los datos.",
        "Comprensión de fenómenos.",
        "Flujo completo de ciencias de datos."
      ]
    ],
    [
      "Machine Learning", 
      "Desde el modelamiento de los datos hasta la puesta en producción",
      [
        "Estrategias de modelamiento a la vanguardia.",
        "Entrenamiento de Redes Neuronales.",
        "Modelos optimizados para determinado fenómeno.",
        "Interpretación de la información que proveen los modelos.",
        "Modularización del proceso de inferencia en una API.",
        "Puesta en producción de una API que permita generar predicciones."
      ]
    ],
    [
      "Desarrollo Web", 
      "Proyectos Web con UI amigables que involucre interacciones sencillas con modelos de datos y visualizaciones.", 
      [
        "Desarrollo Web Full Stack con herramientas como React y Django.",
        "Codigo colaborativo y comprensivo.",
        "Experiencia de usuario satisfactoria.",
        "Herramientas Estadísticas, Data Science y Machine Learning en una plataforma web."
      ]
    ],
  ];

  return ( 
    <StyledServicesSection id="services">
      <StyledSectionSubtitle darkMode={darkMode}>Mis servicios</StyledSectionSubtitle>
      <StyledSectionTitle>Lo que ofrezco</StyledSectionTitle>

      <StyledServicesContainer>
        {
          INFO.map(
            ([title, description, content]) => (
              <ServicesCard 
                key         = {title}
                title       = {title}
                description = {description}
                content     = {content}
              />
            )
          )
        }
      </StyledServicesContainer>

      <ServicesModal /> 

    </StyledServicesSection>
  );
}

export default Services;