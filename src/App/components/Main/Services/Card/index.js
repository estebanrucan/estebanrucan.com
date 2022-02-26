import { useContext } from "react";
import { AppContext } from "../../../../context/Context";
import { StyledServicesArrow, StyledServicesButton, StyledServicesCard, StyledServicesTitle } from "./styles";

function ServicesCard({title, description, content}) {

  const {
    setServicesModalDisplay, 
    setServicesModalContent, 
    darkMode
  } = useContext(AppContext);

  const handleServicesButtonClick = () => {
    setServicesModalDisplay(true);
    setServicesModalContent({title, description, content});
  };

  return ( 
    <StyledServicesCard darkMode={darkMode}>
      <StyledServicesTitle>{title}</StyledServicesTitle>
      <StyledServicesButton
        onClick={handleServicesButtonClick}
      >
        Ver más <StyledServicesArrow />
      </StyledServicesButton>
    </StyledServicesCard>

    
  );
}

export default ServicesCard;