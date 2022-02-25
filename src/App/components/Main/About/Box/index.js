import { StyledAboutBox, StyledAboutSubtitle, StyledAboutTitle } from "./styles";

function AboutBox({title, subtitle, icon}) {
  return ( 
    <StyledAboutBox>
      {icon}
      <StyledAboutTitle>{title}</StyledAboutTitle>
      <StyledAboutSubtitle>{subtitle}</StyledAboutSubtitle>
    </StyledAboutBox>
  );
}

export default AboutBox;