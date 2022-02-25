import { StyledServicesModalItem, StyledServicesModalItemIcon, StyledServicesModalItemInfo } from "./styles";

function ServicesModalItem({content}) {
  return ( 
    <StyledServicesModalItem>
      <StyledServicesModalItemIcon />
      <StyledServicesModalItemInfo>{content}</StyledServicesModalItemInfo>
    </StyledServicesModalItem>
  );
}

export default ServicesModalItem;