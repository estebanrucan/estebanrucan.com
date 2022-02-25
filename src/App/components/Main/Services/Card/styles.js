import styled from "styled-components";
import {BiRightArrowAlt} from "react-icons/bi";

const StyledServicesCard = styled.div`
  background-color: var(--container-color);
  padding: 3rem 1.5rem 1.5rem;
  border-radius: 1rem;
`;

const StyledServicesTitle = styled.h3`
  font-size: var(--h3-font-size);
  margin-bottom: 2.5rem;
`;

const StyledServicesButton = styled.span`
  color: var(--first-color);
  font-size: var(--small-font-size);
  display: flex;
  align-items: center;
  column-gap: .25rem;
  cursor: pointer;
`;

const StyledServicesArrow = styled(BiRightArrowAlt)`
  font-size: 1rem;
  transition: .4s;

  ${StyledServicesButton}:hover & {
    transform: translateX(.25rem);
  }
`;

export {
  StyledServicesCard,
  StyledServicesTitle,
  StyledServicesButton,
  StyledServicesArrow,
};