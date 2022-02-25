import styled, { css } from "styled-components";


const ScrollHeader = props => {
  const styles = css`
    box-shadow: 0 4px 4px hsla(0, 0%, 4%, .3);
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
  ${ScrollHeader}
`;


export {StyledHeader};