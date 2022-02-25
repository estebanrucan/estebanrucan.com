import { useContext } from "react";
import { createPortal } from "react-dom";
import { AppContext } from "../../../../context/Context";
import ServicesModalItem from "./ModalItem";
import { StyledServicesModal, StyledServicesModalCloseIcon, StyledServicesModalContent, StyledServicesModalDescription, StyledServicesModalList, StyledServicesModalTitle } from "./styles";


function ServicesModal() {
  
  const {
    servicesModalContent, 
    setServicesModalDisplay,
    setServicesModalContent
  } = useContext(AppContext);

  const handleCloseServiceModal = () => {
    setServicesModalDisplay(false);
    setServicesModalContent({
      title: "",
      description: "",
      content: []
    });
  };


  return ( 
    
    createPortal(
      <StyledServicesModal>
        <StyledServicesModalContent>
          <StyledServicesModalCloseIcon 
            onClick={handleCloseServiceModal}
          />

          <StyledServicesModalTitle>
            {servicesModalContent.title}
          </StyledServicesModalTitle>
          <StyledServicesModalDescription>
            {servicesModalContent.description}
          </StyledServicesModalDescription>

          <StyledServicesModalList>
            {
              servicesModalContent.content.map(
                item => <ServicesModalItem content={item} key={item}/>
              )
            }
          </StyledServicesModalList>


        </StyledServicesModalContent>
      </StyledServicesModal>,
      document.getElementById("servicesModal")
    )
    
  );
}

export default ServicesModal;