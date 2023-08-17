import { StyledSectionSubtitle, StyledSectionTitle } from "../../../assets/styles";
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
        "Descubrimiento de Insights: En Entel S.A., utilicé técnicas avanzadas de Inteligencia Artificial para identificar necesidades e intereses, transformando datos en información valiosa y accionable.",
        "Modelado Avanzado: Mi experiencia abarca el diseño, implementación y validación de modelos de Machine Learning, tanto supervisados como no supervisados, para extraer patrones y realizar predicciones precisas.",
        "Análisis Estadístico Profundo: Mi formación en Estadística me ha permitido realizar análisis detallados, identificando relaciones subyacentes y patrones en conjuntos de datos complejos.",
        "Exploración de Datos: He aplicado técnicas de análisis exploratorio de datos (EDA) para comprender y visualizar la estructura y características de grandes conjuntos de datos, preparándolos para análisis más profundos.",
        "Soluciones Integradas: Mi capacidad para desarrollar soluciones basadas en Machine Learning que se integran con bases de datos y otras infraestructuras es una muestra de mi enfoque práctico y orientado a resultados en Data Science.",
        "Optimización de Modelos: A través de la evaluación y ajuste de modelos, garantizo que las soluciones de Machine Learning sean eficientes y efectivas, adaptándolas según las necesidades del proyecto.",
        "Educación y Mentoría: Mi rol como docente en la PUC refleja mi pasión por compartir conocimientos y guiar a la próxima generación de científicos de datos."
        
      ]
    ],
    [
      "Trabajo en Equipo", 
      "Colaborador, comunicativo y comprometido en equipos multidisciplinarios y proyectos.",
      [
        "Colaboración Interdisciplinaria: Durante mi experiencia en Entel S.A., colaboré estrechamente con ejecutivos de los Call-Center, uniendo esfuerzos para identificar y abordar necesidades clave a través de la Inteligencia Artificial.",
        "Mentoría y Educación: Como docente en la PUC, he tenido el privilegio de guiar a estudiantes en su viaje académico, trabajando en conjunto con un equipo de profesionales dedicados para ofrecer una educación de calidad.",
        "Desarrollo de Proyectos Colaborativos: Mi participación en proyectos como las aplicaciones web estadísticas, financiadas por Innovadoc UC, refleja mi habilidad para trabajar en equipo y llevar ideas innovadoras a la realidad.",
        "Liderazgo y Representación: Mi rol como Representante Estudiantil en el Programa de Estadística UC me ha permitido ser la voz de mis compañeros, demostrando habilidades de liderazgo y compromiso con la comunidad académica.",
        "Apoyo Académico: A lo largo de mi carrera, he asumido roles de ayudante en diversos cursos y programas, reafirmando mi compromiso con el aprendizaje colaborativo y el apoyo a otros en su desarrollo académico."
      ]
    ],
    [
      "Docencia", 
      "Docente versátil, adaptativo y comprometido, con profundo dominio y pasión pedagógica.", 
      [
        "Diversidad de Temas: En la PUC, he impartido clases en una variedad de temas, desde Machine Learning hasta introducción a Python y estadística, demostrando versatilidad y dominio en diferentes áreas del conocimiento.",
        "Adaptabilidad Pedagógica: He enseñado en diferentes modalidades, desde clases remotas hasta presenciales, adaptándome a las necesidades de los estudiantes y al entorno educativo.",
        "Mentoría Activa: Más allá de la enseñanza tradicional, he guiado a estudiantes en su viaje académico, proporcionando dirección, claridad y apoyo en sus estudios.",
        "Desarrollo de Contenido: Mi experiencia incluye la creación y adaptación de materiales educativos, asegurando que sean relevantes, actualizados y efectivos para el aprendizaje.",
        "Colaboración Académica: Como ayudante de docencia en diversos cursos y programas, he trabajado en conjunto con otros educadores, contribuyendo al éxito del programa educativo.",
        "Compromiso con la Educación Continua: Mi participación en mini-cursos y talleres, como los ofrecidos a través de Data UC, refleja mi dedicación a la educación continua y a la difusión del conocimiento.",
        "Liderazgo en el Aula: Mi capacidad para dirigir clases, moderar discusiones y fomentar un ambiente de aprendizaje positivo es testimonio de mis habilidades de liderazgo en el ámbito educativo."      ]
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