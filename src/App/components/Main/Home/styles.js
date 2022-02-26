import styled from "styled-components";
import { Grid } from "../../../../assets/styles";
import { Container } from "../../../../assets/styles";
import { StyledSection } from "../styles";
import {BiMouse} from "react-icons/bi";

const StyledHome = styled(StyledSection)`

`;

const StyledHomeContainer = styled.div`
  ${Container}
  ${Grid}
  position: relative;
  row-gap: 4.5rem;
  padding-top: 2rem;
`;

const StyledHomeData = styled.div`
  text-align: center;
`;

const StyledHomeGreeting = styled.span`
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
  display: block;
  color: var(--title-color);
  margin-bottom: .25rem;
`;

const StyledHomeName = styled.h1`
  font-size: var(--biggest-font-size);
`;

const StyledHomeEducation = styled.h3`
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
  color: var(--text-color);
  margin-bottom: 2.5rem;
`;

const StyledHomeButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  
`;

const StyledHomeHandle = styled.div`
  justify-self: center;
  width: 190px;
  height: 293px;
  background: linear-gradient(180deg,
    hsla(var(--first-hue), var(--sat), var(--lig), 1),
    hsla(var(--first-hue), var(--sat), var(--lig), .2)
  );
  border-radius: 10rem 10rem 1rem 1rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
`;

const StyledHomeImg = styled.img`
  width: full;
`;

const StyledHomeSocial = styled.div`
  position: absolute;
  bottom: 5rem;
  left: 0;
  display:grid;
  row-gap: .5rem;

  ::after {
    content: "";
    width: 32px;
    height: 2px;
    background-color: var(--${p => p.darkMode ? "first-color" : "title-color"});
    transform: rotate(90deg) translate(16px, 3px);
  }
`;

const StyledHomeScroll = styled.a`
  position: absolute;
  color: var(--${p => p.darkMode ? "first-color" : "title-color"});
  right: -1.5rem;
  bottom: 4rem;
  display: grid;
  row-gap: 2.25rem;
  justify-items: center;
`;

const StyledHomeScrollIcon = styled(BiMouse)`
  font-size: 1.25rem;
`;

const StyledHomeScrollName = styled.span`
  font-size: var(--smaller-font-size);
  transform: rotate(-90deg);
`;


export {
  StyledHome,
  StyledHomeContainer,
  StyledHomeData,
  StyledHomeGreeting,
  StyledHomeName,
  StyledHomeEducation,
  StyledHomeButtons,
  StyledHomeHandle,
  StyledHomeImg,
  StyledHomeSocial,
  StyledHomeScroll,
  StyledHomeScrollIcon,
  StyledHomeScrollName
};