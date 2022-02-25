import styled from "styled-components";
import {Container, Grid} from "../../../assets/styles";

const StyledFooter = styled.footer`
  background-color: var(--first-color);
`;

const StyledFooterContainer = styled.div`
  ${Container}
  ${Grid}
  padding: 2rem 0 6rem;
`;

const StyledFooterTitle = styled.h1`
  color: var(--body-color);
  text-align: center;
  margin-bottom: 2rem;
`;

const StyledFooterList = styled.ul`
  display: flex;
  justify-content: center;
  column-gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StyledFooterSocial = styled.ul`
  display: flex;
  justify-content: center;
  column-gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StyledFooterCopy = styled.span`
  display: block;
  margin-top: 4.5rem;
  color: var(--container-color);
  text-align: center;
  font-size: var(--smaller-font-size);
`;


export {
  StyledFooter,
  StyledFooterContainer,
  StyledFooterTitle,
  StyledFooterList,
  StyledFooterSocial,
  StyledFooterCopy
};