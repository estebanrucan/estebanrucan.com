import styled from "styled-components";
import { Container } from "../../../../assets/styles";


const StyledNavBar = styled.nav`
    ${Container}
    height         : var(--header-height);
    display        : flex;
    justify-content: space-between;
    align-items    : center;
`;

const StyledNavLogo = styled.a`
    color      : var(--first-color);
    font-weight: var(--font-medium);
    transition : .4s;
    :hover {
        color: var(--first-color-alt);
    }
`;

const StyledNavMenu = styled.div`
    position: fixed;
    bottom: 1rem;
    background-color: hsla(var(--second-hue), 32%, 16%, .8);
    width: 90%;
    border-radius: 4rem;
    padding: 1rem 2.25rem;
    backdrop-filter: blur(10px);
`;

const StyledNavList = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;




export {StyledNavBar, StyledNavLogo, StyledNavMenu, StyledNavList};