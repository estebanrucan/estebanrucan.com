import styled from "styled-components";
import { Container, Grid } from "../../../../assets/styles";
import { StyledSection } from "../styles";

const StyledContactSection = styled(StyledSection)`

`;

const StyledContactContainer = styled.div`
  ${Container}
  ${Grid}
  row-gap: 3rem;
  padding-bottom: 3rem;
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
`;



export {
  StyledContactSection,
  StyledContactContainer,
  StyledContactContent,
  StyledContactTitle,
  StyledContactInfo
};
