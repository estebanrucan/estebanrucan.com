import styled from "styled-components";
import { Container, devices, Grid } from "../../../assets/styles";
import { StyledSection } from "../styles";


const StyledServicesSection = styled(StyledSection)`
  
`;

const StyledServicesContainer = styled.div`
  ${Container}
  ${Grid}
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  padding-top: 1rem;

  @media ${devices.small} {
    gap: 1rem;
    justify-content: center;
  }

  @media ${devices.medium} {
    grid-template-columns: repeat(2, 160px);
    justify-content: center;
  }

  @media ${devices.xl} {
    grid-template-columns: repeat(3, 192px);
    column-gap: 3rem;
  }
`;

export {
  StyledServicesSection,
  StyledServicesContainer
};