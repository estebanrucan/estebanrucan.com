import styled from "styled-components";

const StyledFooterLi = styled.li`
  
`;

const StyledFooterLink = styled.a`
  color: var(--${props => props.darkMode ? "body-color" : "title-color"});
`;

export {
  StyledFooterLi,
  StyledFooterLink,
};