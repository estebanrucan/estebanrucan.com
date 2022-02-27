import styled, {css} from "styled-components";
import { devices } from "../../../../assets/styles";

const lightMode = props => {
  const styles = css`
    box-shadow: 0 2px 8px hsla(var(--second-hue), 48%, 8%, .1);
  `;
  return props.darkMode ? "" : styles;
};

const StyledHomeSocialLink = styled.a`
  width: max-content;
  background-color: var(--container-color);
  color: var(--${p => p.darkMode ? "first-color" : "title-color"});
  padding: .25rem;
  border-radius: .25rem;
  display: flex;
  font-size: 1rem;
  transition: .4s;
  ${lightMode}

  :hover {
    background-color: var(--first-color);
    color: #fff;
  }

  @media ${devices.xl} {
    padding: .4rem;
    font-size: 1.25rem;
  }
`;

export {StyledHomeSocialLink}; 