import styled, {css} from "styled-components";
import {BiX} from "react-icons/bi";
import { useContext } from "react";
import {AppContext} from "../../../../context/Context";
import { devices } from "../../../../assets/styles";


const modalTransition = () => {
  const {servicesModalDisplay} = useContext(AppContext);
  const styles = css`
    visibility: hidden;
    opacity: 0;
  `;

  return servicesModalDisplay ? "" : styles;
};  

const StyledServicesModal = styled.div`
  position: fixed;
  inset: 0;
  background-color: hsla(var(--second-hue), 28%, 16%, .7);
  padding: 2rem 1rem;
  display: grid;
  place-items: center;                                         
  transition: .4s;
  ${modalTransition}
  z-index: var(--z-modal);
`;

const StyledServicesModalContent = styled.div`
  position: relative;
  background-color: var(--body-color);
  padding: 4.5rem 1.5rem 2.5rem;
  border-radius: 1.5rem;

  @media ${devices.medium} {
    width: 500px;
    padding: 4.5rem 2.5rem 2.5rem;
  }
`;

const StyledServicesModalCloseIcon = styled(BiX)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 1.5rem;
  color: var(--first-color);
  cursor: pointer;
`;

const StyledServicesModalTitle = styled.h3`
  text-align: center;
  font-size: var(--h3-font-size);
  color: var(--first-color);
  margin-bottom: 1rem;
`;

const StyledServicesModalDescription = styled.p`
  text-align: center;
  font-size: var(--small-font-size);
  margin-bottom: 2rem;

  @media ${devices.medium} {
    padding: 0 3.5rem;
  }
`;

const StyledServicesModalList = styled.ul`
  display: grid;
  row-gap: .75rem;
`;

export {
  StyledServicesModal,
  StyledServicesModalContent,
  StyledServicesModalCloseIcon,
  StyledServicesModalTitle,
  StyledServicesModalDescription,
  StyledServicesModalList
};
