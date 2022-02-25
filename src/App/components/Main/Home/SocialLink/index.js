import { StyledHomeSocialLink } from "./styles";

function HomeSocialLink({href, icon}) {
  return ( 
    <StyledHomeSocialLink href={href} target="_blank">
      {icon}
    </StyledHomeSocialLink>
  );
}

export default HomeSocialLink;