import styled from "styled-components";
import { css } from "styled-components";
import { Button } from "../../../../../assets/styles";

const StyledContactForm = styled.form`

`;

const StyledContactFormDiv = styled.div`
  position: relative;
  margin-top: 2rem;
  height: 4rem;
`;

const StyledContactFormDivArea = styled(StyledContactFormDiv)`
  height: 11rem;
`;

const anyErrorBorder = props => props.anyError ? "#FD5D5D" : "var(--text-color-light)";
const anyErrorText = props => props.anyError ? "#FD5D5D" : "var(--text-color)";

const StyledContactFormTag = styled.label`
  position: absolute;
  top: -.75rem;
  left: 1.25rem;
  font-size: var(--smaller-font-size);
  padding: .25rem;
  background-color: var(--body-color);
  color: ${anyErrorText};
  z-index: 10;
`;


const ContactInputStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid ${anyErrorBorder};
  background: none;
  color: var(--text-color);
  outline: none;
  padding: 1.5rem;
  border-radius: .75rem;
  z-index: 1;
`;

const StyledContactFormInput = styled.input`
  ${ContactInputStyle};
`;

const StyledContactFormTextArea = styled.textarea`
  ${ContactInputStyle};
  resize: none;
`;

const StyledContactFormButton = styled.button`
  ${Button}
  display: inline-block;
  background-color: var(--first-color);
  color: var(--${p => p.darkMode ? "body-color" : "title-color"});
  padding: .75rem 1rem;
  border-radius: .5rem;
  font-weight: var(--font-medium);
  transition: .4s;

  :hover {
    background-color: var(--first-color-alt);
    color: var(--${p => p.darkMode ? "body-color" : "title-color"});
  }
`;

const StyledErrorMessage = styled.p`
  color: #FD5D5D;
  margin-top: 0.5rem;
  margin-left: 1rem;
  font-size: var(--small-font-size);
`;

const StyledContactFormSendDiv = styled.div`
  margin-top: 2rem;
  width: auto;
  height: auto;
  display: flex;
  flex-direction: flex-col;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;

`;

const StyledContactFormSendMessage = styled.p`
  color: ${props => props.messageIsValid ? "#30A939" : "#FD5D5D"};
  font-weight: semi-bold;
`;



export {
  StyledContactForm,
  StyledContactFormDiv,
  StyledContactFormDivArea,
  StyledContactFormTag,
  StyledContactFormInput,
  StyledContactFormTextArea,
  StyledContactFormButton,
  StyledErrorMessage,
  StyledContactFormSendDiv,
  StyledContactFormSendMessage
};