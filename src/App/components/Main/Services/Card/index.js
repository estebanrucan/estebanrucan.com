import { useContext } from "react";
import { AppContext } from "../../../../context/Context";
import { StyledServicesArrow, StyledServicesButton, StyledServicesCard, StyledServicesTitle } from "./styles";

function ServicesCard({title, description, content}) {

  const {setServicesModalDisplay, setServicesModalContent} = useContext(AppContext);

  const handleServicesButtonClick = () => {
    setServicesModalDisplay(true);
    setServicesModalContent({title, description, content});
  };

  return ( 
    <StyledServicesCard>
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