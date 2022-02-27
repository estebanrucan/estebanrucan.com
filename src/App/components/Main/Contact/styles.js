import styled from "styled-components";
import { Container, devices, Grid } from "../../../assets/styles";
import { StyledSection } from "../styles";

const StyledContactSection = styled(StyledSection)`

`;

const StyledContactContainer = styled.div`
  ${Container}
  ${Grid}
  row-gap: 3rem;
  padding-bottom: 3rem;

  @media ${devices.large} {
    grid-template-columns: repeat(2, max-content);
    justify-content: center;
    column-gap: 3rem;
  }

  @media ${devices.xl} {
    column-gap: 6rem;
  }
`;

const StyledContactContent = styled.div`

`;

const StyledContactTitle = styled.h3`
  text-align: center;
  font-size: var(--h3-font-size);
  margin-bottom: 1.5rem;
`;

const StyledContactInfo = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;

  @media ${devices.medium} {
    grid-template-columns: repeat(auto-fit, 175px);
  }

  @media ${devices.large} {
    grid-template-columns: 300px;
  }
`;



export {
  StyledContactSection,
  StyledContactContainer,
  StyledContactContent,
  StyledContactTitle,
  StyledContactInfo
};
