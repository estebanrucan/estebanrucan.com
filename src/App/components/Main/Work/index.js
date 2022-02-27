import { StyledSectionSubtitle, StyledSectionTitle } from "../../../assets/styles";
import { StyledWorkContainer, StyledWorkFilters, StyledWorkItem, StyledWorkSection } from "./styles";
import work1 from "../../../assets/img/apuntes-personales.png";
import work2 from "../../../assets/img/recomendador-cursos-uc.png";
import work3 from "../../../assets/img/covid-interactive-explorer.png";
import WorkCard from "./Card";
import { useContext } from "react";
import { AppContext } from "../../../context/Context";

function Work() {

  const {
    currentWorkCategory, 
    setCurrentWorkCategory, 
    refWork, 
    darkMode
  } = useContext(AppContext);

  const CATEGORIES = ["Todos", "ML", "DS", "Libros"];

  
  const WORKS = [
    {img: work1, title: "Libro de Apuntes Personales", link: "https://estebanrucan.github.io/personal-book/", category: "Libros"},
    {img: work2, title: "Recomendador de Cursos UC", link: "https://share.streamlit.io/estebanrucan/recomendador-cursos-uc/main/app/app.py", category: "ML"},
    {img: work3, title: "Covid Interactive Explorer", link: "https://estebanr.shinyapps.io/covid-interactive-exploration/", category: "DS"},
  ];
    
  const FILTERED_WORKS = 
    currentWorkCategory === "Todos"
      ? WORKS
      : WORKS.filter(work => work.category === currentWorkCategory); 
  

  return ( 
    <StyledWorkSection id="work" ref={refWork}>
      <StyledSectionSubtitle darkMode={darkMode}>Mi portafolio</StyledSectionSubtitle>
      <StyledSectionTitle>Algunos proyectos</StyledSectionTitle>

      <StyledWorkFilters>
        {
          CATEGORIES.map(
            cat => (
              <StyledWorkItem 
                key      = {cat}
                onClick  = {() => setCurrentWorkCategory(cat)}
                isActive = {cat === currentWorkCategory}
                darkMode = {darkMode}
              >
                {cat}
              </StyledWorkItem>
            )
          )
        }
      </StyledWorkFilters>

      <StyledWorkContainer>
        {
          FILTERED_WORKS.map(work => (
            <WorkCard 
              key={work.title}
              img={work.img}
              title={work.title}
              link={work.link}
            />
          ))
        }
      </StyledWorkContainer>

    </StyledWorkSection>
  );
}

export default Work;