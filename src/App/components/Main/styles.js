import styled from "styled-components";
import { devices } from "../../assets/styles";


const StyledMain = styled.main`
  overflow: hidden;
`;

const StyledSection = styled.section`
  padding: 4.5rem 0 1rem;

  @media ${devices.xl} {
    padding: 6.5rem 0 1rem;
  }
`;

export {
  StyledMain,
  StyledSection
};