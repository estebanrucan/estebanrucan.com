import styled from "styled-components";
import {BiRightArrowAlt} from "react-icons/bi";
import { BoxLightMode } from "../../../../../assets/styles";

const StyledContactCard = styled.div`
  background-color: var(--container-color);
  padding: 1rem;
  border-radius: .75rem;
  text-align: center;
  ${BoxLightMode(16)}
`;

const StyledContactCardTitle = styled.h3`
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
`;

const StyledContactCardData = styled.span`
  font-size: var(--small-font-size);
  display: block;
  margin-bottom: .75rem;
`;

const StyledContactButton = styled.a`
  color: var(--first-color);
  font-size: var(--small-font-size);
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: .25rem;
`;

const StyledContactButtonIcon = styled(BiRightArrowAlt)`
  font-size: 1rem;
  transition: .4s;

  ${StyledContactButton}:hover > & {
    transform: translateX(.25rem);
  }
`;

const StyledContactCardIcon = icon => styled(icon)`
  font-size: 2rem;
  color: var(--title-color);
  margin-bottom: .25rem;
`;


export {
  StyledContactCard,
  StyledContactCardTitle,
  StyledContactCardData,
  StyledContactButton,
  StyledContactButtonIcon,
  StyledContactCardIcon
};
