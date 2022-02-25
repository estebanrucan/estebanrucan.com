import { StyledContactButton, StyledContactButtonIcon, StyledContactCard, StyledContactCardData, StyledContactCardIcon, StyledContactCardTitle } from "./styles";

function ContactCard({icon, title, data, link}) {

  const StyledIcon = StyledContactCardIcon(icon);

  return ( 
    <StyledContactCard>
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