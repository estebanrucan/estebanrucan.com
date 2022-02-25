import { StyledFooterLi, StyledFooterLink } from "./styles";

function FooterMapLink({href, content}) {
  return ( 
    <StyledFooterLi>
      <StyledFooterLink href={href}>{content}</StyledFooterLink>
    </StyledFooterLi>
  );
}

export default FooterMapLink;