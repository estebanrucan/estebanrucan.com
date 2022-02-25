import { BiAward, BiBriefcase, BiTrophy } from "react-icons/bi";
import styled, {css} from "styled-components";
import { Container, Grid } from "../../../../assets/styles";
import { StyledSection } from "../styles";


const StyledAbout = styled(StyledSection)`

`;

const StyledAboutContainer = styled.div`
  ${Container}
  ${Grid}
  row-gap: 2.5rem;
`;

const StyledAboutImg = styled.img`
  width: 220px;
  border-radius: 1.5rem;
  justify-self: center;
`;

const StyledAboutData = styled.div`
  text-align: center;
`;

const StyledAboutInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .5rem;
  margin-bottom: 2rem;
`;


const AboutIcon = css`
  font-size: 1.5rem;
  color: var(--first-color);
  margin-bottom: .5rem;
`;

const StyledAboutIconAward = styled(BiAward)`
  ${AboutIcon}
`;

const StyledAboutIconBriefcase = styled(BiBriefcase)`
  ${AboutIcon}
`;

const StyledAboutIconTrophy= styled(BiTrophy)`
  ${AboutIcon}
`;

const StyledAboutDescription = styled.p`
  margin-bottom: 2rem;

`;


export {
  StyledAbout,
  StyledAboutContainer,
  StyledAboutImg,
  StyledAboutData,
  StyledAboutInfo,
  StyledAboutIconAward,
  StyledAboutIconBriefcase,
  StyledAboutIconTrophy,
  StyledAboutDescription
};