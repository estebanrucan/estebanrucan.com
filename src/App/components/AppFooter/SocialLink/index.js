import { StyledFooterSocialLink } from "./styles";

function FooterSocialLink({href, icon}) {
  return ( 
    <StyledFooterSocialLink href={href} target="_blank">
      {icon}
    </StyledFooterSocialLink>
  );
}

export default FooterSocialLink;