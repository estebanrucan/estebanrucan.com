import styled from "styled-components";
import { ActiveLink } from "../../../../../assets/styles";

const StyledNavItem = styled.li`
`;


const StyledNavLink = styled.a`
  color: var(--text-color);
  font-size: 1.25rem;
  padding: .4rem;
  display: flex;
  border-radius: 5rem;
  ${props => props.active ? ActiveLink : ""}
`;

export {StyledNavItem, StyledNavLink};