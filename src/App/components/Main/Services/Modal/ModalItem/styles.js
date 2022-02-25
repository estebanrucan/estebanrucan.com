import styled from "styled-components";
import { BiCheck } from "react-icons/bi"; 

const StyledServicesModalItem = styled.li`
  display: flex;
  align-items: flex-start;
  column-gap: .5rem;
`;
const StyledServicesModalItemIcon = styled(BiCheck)`
  font-size: 1.5rem;
  color: var(--first-color);
`;
const StyledServicesModalItemInfo = styled.p`

`;

export {
  StyledServicesModalItem,
  StyledServicesModalItemIcon,
  StyledServicesModalItemInfo
};