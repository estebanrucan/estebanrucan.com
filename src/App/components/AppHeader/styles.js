import styled, { css } from "styled-components";


const ScrollHeader = props => {
  const darkMode = props.darkMode;
  const sides = darkMode ? "4px" : "2px";  
  const color = darkMode ? "hsla(0, 0%, 4%, .3)" : "#cdcdcd";
  const styles = css`
    box-shadow: 0 ${sides} 4px ${color};
  `; 
  return !props.inView ? styles : "";
  
};

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  margin: 0;
  width: 100%;
  background-color: var(--body-color);
  z-index: var(--z-fixed);
  transition: 0.4s;
  ${ScrollHeader}
`;


export {StyledHeader};