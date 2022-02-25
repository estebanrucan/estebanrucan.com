import {StyledNavItem, StyledNavLink} from "./styles";
import { useContext } from "react";
import { AppContext } from "../../../../context/Context";

function NavItem({href, children}) {

  const {
    activeLink,
    setActiveLink,
  } = useContext(AppContext);

  const isActive = value => value === activeLink;

  return ( 
    <StyledNavItem>
      <StyledNavLink 
        href    = {href}
        active  = {isActive(href)}
        onClick = {() => setActiveLink(href)}
      >
        {children}
      </StyledNavLink>
    </StyledNavItem>
  );
}

export default NavItem;