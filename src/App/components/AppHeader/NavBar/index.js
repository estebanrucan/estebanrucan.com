/* eslint-disable indent */
import NavItem from "./NavItem";
import { StyledNavBar, StyledNavDarkMode, StyledNavLightMode, StyledNavList, StyledNavLogo, StyledNavMenu } from "./styles";
import {BiBook, BiBriefcaseAlt2, BiHomeAlt, BiMessageSquareDetail, BiUser} from "react-icons/bi";
import { useContext } from "react";
import { AppContext } from "../../../context/Context";

function NavBar() {

  const { darkMode, setDarkMode } = useContext(AppContext);

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

      <StyledNavMenu darkMode={darkMode}>
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

      {
        darkMode 
          ? <StyledNavDarkMode onClick={() => setDarkMode(false)} /> 
          : <StyledNavLightMode onClick={() => setDarkMode(true)} />   
      }

    </StyledNavBar>

  // Theme Change Button

  );
}

export default NavBar;