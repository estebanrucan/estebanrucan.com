import FooterMapLink from "./MapLink";
import { StyledFooter, StyledFooterContainer, StyledFooterCopy, StyledFooterList, StyledFooterSocial, StyledFooterTitle } from "./styles";
import { BsLinkedin, BsGithub, BsInstagram } from "react-icons/bs";
import FooterSocialLink from "./SocialLink";
import { StyledFooterLink } from "./MapLink/styles";
import { useContext } from "react";
import { AppContext } from "../../context/Context";


function AppFooter() {

  const {darkMode} = useContext(AppContext);

  const CONTENT = [
    {href: "#about",    content: "Sobre mi"},
    {href: "#services", content: "Servicios"},
    {href: "#work",     content: "Portafolio"},
  ];

  const SOCIAL_LINKS = [
    {href: "https://www.linkedin.com/in/estebanrucan/", icon: <BsLinkedin />},
    {href: "https://github.com/estebanrucan/",          icon: <BsGithub />},
    {href: "https://www.instagram.com/estebanrucan/",   icon: <BsInstagram />}
  ];

  return ( 
    <StyledFooter>
      <StyledFooterContainer>
        <StyledFooterTitle darkMode={darkMode}>Esteban Rucán</StyledFooterTitle>
        
        <StyledFooterList>
          {
            CONTENT.map(
              item => (
                <FooterMapLink 
                  key     = {item.href}
                  href    = {item.href}
                  content = {item.content}
                />
              )
            )
          }
        </StyledFooterList>

        <StyledFooterSocial>
          {
            SOCIAL_LINKS.map(
              item => (
                <FooterSocialLink 
                  key  = {item.href}
                  href = {item.href}
                  icon = {item.icon}
                />
              )
            )
          }
        </StyledFooterSocial>

        <StyledFooterCopy darkMode={darkMode}>
        &#169; 
          <StyledFooterLink href="https://www.estebanrucan.ml">
            estebanrucan.ml
          </StyledFooterLink>
        . Todos los derechos reservados.
        </StyledFooterCopy>
      </StyledFooterContainer>
    </StyledFooter>
  );
}

export default AppFooter;