import styled from "styled-components";
import { Container, Grid } from "../../../../assets/styles";
import { StyledSection } from "../styles";


const StyledServicesSection = styled(StyledSection)`
  
`;

const StyledServicesContainer = styled.div`
  ${Container}
  ${Grid}
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  padding-top: 1rem;
`;

export {
  StyledServicesSection,
  StyledServicesContainer
};