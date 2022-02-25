import { StyledButton, StyledButtonGhost } from "../../../../assets/styles";
import { 
  StyledHome,
  StyledHomeButtons,
  StyledHomeContainer, 
  StyledHomeData, 
  StyledHomeEducation, 
  StyledHomeGreeting, 
  StyledHomeHandle, 
  StyledHomeImg,
  StyledHomeName,
  StyledHomeScroll,
  StyledHomeScrollIcon,
  StyledHomeScrollName,
  StyledHomeSocial
} from "./styles";
import { BsLinkedin, BsGithub, BsInstagram } from "react-icons/bs";
import HomeSocialLink from "./SocialLink";
import perfilImage from "../../../../assets/img/perfil.png";
import cv from "../../../../assets/pdf/cv-esteban-rucan.pdf";
import { useContext } from "react";
import { AppContext } from "../../../context/Context";


function Home() {

  const {ref} = useContext(AppContext);

  const SOCIAL_LINKS = {
    "https://www.linkedin.com/in/estebanrucan/": <BsLinkedin />,
    "https://github.com/estebanrucan/"          : <BsGithub />,
    "https://www.instagram.com/estebanrucan/": <BsInstagram />
  };


  return ( 
    <StyledHome id="home">
      <StyledHomeContainer>
      
        <StyledHomeData>
          <StyledHomeGreeting ref={ref}>Hola, soy</StyledHomeGreeting>
          <StyledHomeName>Esteban Rucán</StyledHomeName>
          <StyledHomeEducation>Data Science &bull; Machine Learning &bull; Web Development</StyledHomeEducation>
          <StyledHomeButtons>
            <StyledButtonGhost download="" href={cv} target="_blank">Descargar CV</StyledButtonGhost>
            <StyledButton href="#about">Sobre mi</StyledButton>
          </StyledHomeButtons>
        </StyledHomeData>

        <StyledHomeHandle>
          <StyledHomeImg src={perfilImage}/>
        </StyledHomeHandle>

        <StyledHomeSocial>
          {
            Object.entries(SOCIAL_LINKS)
              .map(([href, icon]) => (
                <HomeSocialLink
                  key={href}
                  href={href}
                  icon={icon}
                />
              ))
          }
        </StyledHomeSocial>

        <StyledHomeScroll href="#about">
          <StyledHomeScrollIcon />
          <StyledHomeScrollName>Desplazarse</StyledHomeScrollName>
        </StyledHomeScroll>
        
      </StyledHomeContainer>
    </StyledHome>
  );
}

export default Home;