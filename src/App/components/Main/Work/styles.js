import styled, {css} from "styled-components";
import { Container, Grid } from "../../../../assets/styles";
import { StyledSection } from "../styles";

const StyledWorkSection = styled(StyledSection)`

`;

const StyledWorkFilters = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: .75rem;
  margin-bottom: 2rem;
`;

const activeStyledWorkItem = props => {

  const styles = css`
    background-color: var(--${props.darkMode ? "first-color" : "title-color"});
    color: var(--body-color);
  `;

  return props.isActive ? styles : "";
};

const StyledWorkItem = styled.span`
  cursor: pointer;
  color: var(--title-color);
  padding: .25rem .75rem;
  font-weight: var(--font-medium);
  border-radius: .5rem;
  ${activeStyledWorkItem}
`; 

const StyledWorkContainer = styled.span`
  ${Container}
  ${Grid}
  padding-top: 1rem;
`; 

export {
  StyledWorkSection,
  StyledWorkFilters,
  StyledWorkItem,
  StyledWorkContainer
};

