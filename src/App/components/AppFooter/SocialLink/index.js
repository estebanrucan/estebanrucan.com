import { StyledFooterSocialLink } from "./styles";
import { useContext } from "react";
import { AppContext } from "../../../context/Context";

function FooterSocialLink({href, icon}) {

  const {darkMode} = useContext(AppContext);

  return ( 
    <StyledFooterSocialLink href={href} target="_blank" darkMode={darkMode}>
      {icon}
    </StyledFooterSocialLink>
  );
}

export default FooterSocialLink;