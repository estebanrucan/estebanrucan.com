import { StyledWorkButton, StyledWorkCard, StyledWorkIcon, StyledWorkImg, StyledWorkTitle } from "./styles";
import { useContext } from "react";
import { AppContext } from "../../../../context/Context";

function WorkCard({img, title, link}) {

  const {darkMode} = useContext(AppContext);

  return ( 
    <StyledWorkCard darkMode={darkMode}>
      <StyledWorkImg src={img} alt={title} />

      <StyledWorkTitle>{title}</StyledWorkTitle>

      <StyledWorkButton href={link} target="_blank">
        Demo <StyledWorkIcon />
      </StyledWorkButton>
    </StyledWorkCard>
  );
}

export default WorkCard;