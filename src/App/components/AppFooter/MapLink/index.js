import { StyledFooterLi, StyledFooterLink } from "./styles";
import { useContext } from "react";
import { AppContext } from "../../../context/Context";

function FooterMapLink({href, content}) {

  const {darkMode} = useContext(AppContext);

  return ( 
    <StyledFooterLi>
      <StyledFooterLink href={href} darkMode={darkMode}>{content}</StyledFooterLink>
    </StyledFooterLi>
  );
}

export default FooterMapLink;