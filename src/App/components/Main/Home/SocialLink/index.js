import { StyledHomeSocialLink } from "./styles";
import { useContext } from "react";
import { AppContext } from "../../../../context/Context";

function HomeSocialLink({href, icon}) {

  const {darkMode} = useContext(AppContext);

  return ( 
    <StyledHomeSocialLink href={href} target="_blank" darkMode={darkMode}>
      {icon}
    </StyledHomeSocialLink>
  );
}

export default HomeSocialLink;