/* eslint-disable indent */
import NavItem from "./NavItem";
import { StyledNavBar, StyledNavList, StyledNavLogo, StyledNavMenu } from "./styles";
import {BiBook, BiBriefcaseAlt2, BiHomeAlt, BiMessageSquareDetail, BiMoon, BiUser} from "react-icons/bi";


function NavBar() {

  const INFO = {
    "#home"   : <BiHomeAlt />,
    "#about"  : <BiUser />,
    "#skills"  : <BiBook />,
    "#work"   : <BiBriefcaseAlt2 />,
    "#contact": <BiMessageSquareDetail />
  };


  return ( 
    <StyledNavBar>
    
      <StyledNavLogo>Esteban Rucán</StyledNavLogo>

      <StyledNavMenu>
        <StyledNavList>
          {
            Object.entries(INFO)
              .map(
                ([key, value]) => <NavItem 
                                    href = {key}
                                    key  = {key}
                                  >
                                    {value}
                                  </NavItem>
              )
          }
        </StyledNavList>
      </StyledNavMenu>

      <BiMoon />

    </StyledNavBar>

  // Theme Change Button

  );
}

export default NavBar;