import styled from "styled-components";

const StyledHomeSocialLink = styled.a`
  width: max-content;
  background-color: var(--container-color);
  color: var(--first-color);
  padding: .25rem;
  border-radius: .25rem;
  display: flex;
  font-size: 1rem;
  transition: .4s;

  :hover {
    background-color: var(--first-color);
    color: #fff;
  }
`;

export {StyledHomeSocialLink}; 