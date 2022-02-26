import { StyledAboutBox, StyledAboutSubtitle, StyledAboutTitle } from "./styles";
import { useContext } from "react";
import { AppContext } from "../../../../context/Context";

function AboutBox({title, subtitle, icon}) {

  const {darkMode} = useContext(AppContext);

  return ( 
    <StyledAboutBox darkMode={darkMode}>
      {icon}
      <StyledAboutTitle>{title}</StyledAboutTitle>
      <StyledAboutSubtitle>{subtitle}</StyledAboutSubtitle>
    </StyledAboutBox>
  );
}

export default AboutBox;