import styled from "styled-components";
import { BoxLightMode, Container, devices, Grid } from "../../../assets/styles";
import { StyledSection } from "../styles";


const StyledSkillsSection = styled(StyledSection)`

`;

const StyledSkillsContainer = styled.div`
  ${Container}
  ${Grid}
  row-gap: 2rem;
  padding-top: 1rem;

  @media ${devices.medium} {
    justify-content: center;
  }

  @media ${devices.xl} {
    grid-template-columns: repeat(2, 350px);
  }

`;

const StyledSkillsContent = styled.div`
  background-color: var(--container-color);
  padding: 1.5rem;
  border-radius: 1.25rem;
  ${BoxLightMode(16)}

  @media ${devices.medium} {
    padding: 2rem 4rem;
  }
`;

const StyledSkillsTitle = styled.h3`
  font-size: var(--normal-font-size);
  font-weight: var(--font-medium);
  color: var(--first-color);
  text-align: center;
  margin-bottom: 1.5rem;
`;


const StyledSkillsBox = styled.div`
  display: flex;
  justify-content: space-around;
  column-gap: 2.5rem;

  @media ${devices.small} {
    column-gap: 1rem;
  }
`;

const StyledSkillsGroup = styled.div`
  display: grid;
  align-content: flex-start;
  row-gap: 1rem;
`;

export {
  StyledSkillsSection,
  StyledSkillsContainer,
  StyledSkillsContent,
  StyledSkillsTitle,
  StyledSkillsBox,
  StyledSkillsGroup
};
