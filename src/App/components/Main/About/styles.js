import { BiAward, BiBriefcase, BiTrophy } from "react-icons/bi";
import styled, {css} from "styled-components";
import { Container, devices, Grid } from "../../../assets/styles";
import { StyledSection } from "../styles";


const StyledAbout = styled(StyledSection)`

`;

const StyledAboutContainer = styled.div`
  ${Container}
  ${Grid}
  row-gap: 2.5rem;

  @media ${devices.xl} {
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    column-gap: 4rem;
  }
`;

const StyledAboutImg = styled.img`
  width: 220px;
  border-radius: 1.5rem;
  justify-self: center;

  @media ${devices.xl} {
    width: 350px;
  }
`;

const StyledAboutData = styled.div`
  text-align: center;

  @media ${devices.xl} {
    text-align: initial;
  }
`;

const StyledAboutInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .5rem;
  margin-bottom: 2rem;

  @media ${devices.small} {
    grid-auto-columns: repeat(2, 1fr);
  }

  @media ${devices.medium} {
    grid-template-columns: repeat(3, 150px);
    justify-content: center;
  }

  @media ${devices.xl} {
    justify-content: initial;
  }
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

  @media ${devices.medium} {
    padding: 0 5rem;
  }

  @media ${devices.xl} {
    padding: 0 1rem 0 0;
    margin-bottom: 2.5rem;
  }

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