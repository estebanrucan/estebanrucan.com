import styled from "styled-components";
import { devices } from "../../../assets/styles";

const StyledFooterSocialLink = styled.a`
  background-color: var(--${props => props.darkMode ? "body-color" : "title-color"});
  color: var(--first-color);
  padding: .25rem;
  border-radius: .25rem;
  font-size: 1rem;
  display: inline-flex;

  @media ${devices.xl} {
    font-size: 1.24rem;
    padding: .4rem;
    border-radius: .5rem;
  }
`;

export {
  StyledFooterSocialLink
};