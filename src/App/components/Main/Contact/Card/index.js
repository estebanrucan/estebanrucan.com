import { StyledContactButton, StyledContactButtonIcon, StyledContactCard, StyledContactCardData, StyledContactCardIcon, StyledContactCardTitle } from "./styles";
import { useContext } from "react";
import { AppContext } from "../../../../context/Context";

function ContactCard({icon, title, data, link}) {

  const {darkMode} = useContext(AppContext);

  const StyledIcon = StyledContactCardIcon(icon);

  return ( 
    <StyledContactCard darkMode={darkMode}>
      <StyledIcon />
      <StyledContactCardTitle>{title}</StyledContactCardTitle>
      <StyledContactCardData>{data}</StyledContactCardData>
      <StyledContactButton href={link} target="_blank">
        Escríbeme <StyledContactButtonIcon />
      </StyledContactButton>
    </StyledContactCard>
  );
}

export default ContactCard;