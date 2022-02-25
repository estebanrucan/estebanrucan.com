import { useContext } from "react";
import { AppContext } from "../../context/Context";
import { StyledHeader } from "./styles";

function AppHeader(props) {

  const {inView} = useContext(AppContext);

  return ( 
    <StyledHeader id="header" inView={inView}>
      {props.children}
    </StyledHeader>
  );
}

export default AppHeader;
