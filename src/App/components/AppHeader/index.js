import { useContext } from "react";
import { AppContext } from "../../context/Context";
import { StyledHeader } from "./styles";

function AppHeader(props) {

  const {inView, darkMode} = useContext(AppContext);

  return ( 
    <StyledHeader id="header" inView={inView} darkMode={darkMode}>
      {props.children}
    </StyledHeader>
  );
}

export default AppHeader;
