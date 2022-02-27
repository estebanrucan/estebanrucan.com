import styled, { css } from "styled-components";

const breakPoint = size => `screen and (min-width: ${size}px)`;

const devices = {
  vs    : "screen and (max-width: 319px)",
  small : breakPoint(320),
  medium: breakPoint(576),
  large : breakPoint(767),
  xl    : breakPoint(992),
};

const Container = css`
  max-width   : 968px;
  margin-left : 1rem;
  margin-right: 1rem;

  @media ${devices.xl} {
    margin-left: auto;
    margin-right: auto;
  }
`;

const ActiveLink = css`
  background: linear-gradient(180deg,
    hsla(var(--first-hue), var(--sat), var(--lig), 1),
    hsla(var(--first-hue), var(--sat), var(--lig), .2));
  box-shadow: 0 0 16px hsla(var(--first-hue), var(--sat), var(--lig), .4);
  color: var(--title-color);
`;


const Grid = css`
  display: grid;
  gap: 1.25rem;
`;

const Button = css`
  font-family: var(--body-font);
  font-size: var(--normal-font-size);
`;


const StyledButton = styled.a`
  ${Button}
  display: inline-block;
  background-color: var(--first-color);
  color: var(--${p => p.darkMode ? "body-color" : "title-color"});
  padding: .75rem 1rem;
  border-radius: .5rem;
  font-weight: var(--font-medium);
  transition: .4s;

  :hover {
    background-color: var(--first-color-alt);
    color: var(--${p => p.darkMode ? "body-color" : "title-color"});
  }
`;

const StyledButtonGhost = styled(StyledButton)`
  background-color: transparent;
  border: 2px solid var(--first-color);
  color: var(--${p => p.darkMode ? "first-color" : "title-color"});
`;

const StyledSectionSubtitle = styled.span`
  text-align: center;
  display: block;
  font-size: var(--smaller-font-size);
  color: var(${p => p.darkMode ? "--text-color-light" : "--text-color"});
`;

const StyledSectionTitle = styled.h2`
  text-align: center;
  font-size: var(--h2-font-size);
  color: var(--first-color);
  margin-bottom: 2rem;

  @media ${devices.xl} {
    margin-bottom: 3.5rem;
  }
`;


const BoxLightMode = size => {
  return props => {
    const styles = css`
      box-shadow: 0 2px ${size}px var(--shadow-box);
    `;
  
    return props.darkMode ? "" : styles;
  };
};



export {
  Container, 
  ActiveLink,
  Grid,
  Button,
  StyledButtonGhost,
  StyledButton,
  StyledSectionSubtitle,
  StyledSectionTitle,
  BoxLightMode,
  devices
};

