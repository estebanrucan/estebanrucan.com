import { StyledSectionSubtitle, StyledSectionTitle } from "../../../../assets/styles";
import SkillsData from "./Data";
import { StyledSkillsContainer, StyledSkillsSection, StyledSkillsContent, StyledSkillsTitle, StyledSkillsBox, StyledSkillsGroup } from "./styles";

function Skills() {

  const DS_GROUP1 = {
    "Python": "Avanzado",
    "R": "Avanzado",
    "Machine Learning": "Avanzado",
  };
  const DS_GROUP2 = {
    "Data Analysis": "Avanzado",
    "Deep Learning": "Intermedio",
    "Data Visualization": "Avanzado",
  };

  const OA_GROUP1 = {
    "Django": "Básico",
    "FastAPI": "Intermedio",
    "MySQL": "Intermedio"
  };
  const OA_GROUP2 = {
    "React": "Intermedio",
    "Javascript": "Intermedio",
    "HTML": "Intermedio"
  };

  return  (

    <StyledSkillsSection id="skills">
      <StyledSectionSubtitle>Mis habilidades</StyledSectionSubtitle>
      <StyledSectionTitle>Mis conocimientos</StyledSectionTitle>

      <StyledSkillsContainer>
        {/*CONTENT 1*/}
        <StyledSkillsContent>
          <StyledSkillsTitle>Data Science</StyledSkillsTitle>
          <StyledSkillsBox>
            <StyledSkillsGroup>
              {
                Object.entries(DS_GROUP1)
                  .map(([name, level]) => (
                    <SkillsData 
                      key={name}
                      name={name}
                      level={level}
                    />
                  ))
              }
            </StyledSkillsGroup>
            <StyledSkillsGroup>
              {
                Object.entries(DS_GROUP2)
                  .map(([name, level]) => (
                    <SkillsData 
                      key={name}
                      name={name}
                      level={level}
                    />
                  ))
              }
            </StyledSkillsGroup>
          </StyledSkillsBox>
        </StyledSkillsContent>
        {/*CONTENT 2*/}
        <StyledSkillsContent>
          <StyledSkillsTitle>Other Abilities</StyledSkillsTitle>
          <StyledSkillsBox>
            {/*GROUP 3*/}
            <StyledSkillsGroup>
              {
                Object.entries(OA_GROUP1)
                  .map(([name, level]) => (
                    <SkillsData 
                      key={name}
                      name={name}
                      level={level}
                    />
                  ))
              }
            </StyledSkillsGroup>
            {/*GROUP 4*/}
            <StyledSkillsGroup>
              {
                Object.entries(OA_GROUP2)
                  .map(([name, level]) => (
                    <SkillsData 
                      key={name}
                      name={name}
                      level={level}
                    />
                  ))
              }
            </StyledSkillsGroup>
          </StyledSkillsBox>
        </StyledSkillsContent>

      </StyledSkillsContainer>
    </StyledSkillsSection>

  ) ;
}

export default Skills;