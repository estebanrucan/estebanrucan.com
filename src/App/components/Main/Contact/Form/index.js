import { useForm } from "react-hook-form";
import { StyledContactForm, StyledContactFormButton, StyledContactFormDiv, StyledContactFormDivArea, StyledContactFormInput, StyledContactFormSendDiv, StyledContactFormSendMessage, StyledContactFormTag, StyledContactFormTextArea, StyledErrorMessage } from "./styles";
import {yupResolver} from "@hookform/resolvers/yup"; 
import * as yup from "yup";
import { useCallback, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../../../context/Context";


const schema = yup.object({
  contactName: yup.string().min(3).max(30).required(),
  contactMail: yup.string().email().min(6).max(50).required(),
  contactContent: yup.string().min(5).max(255).required(),
});

function ContactForm() {

  const {darkMode} = useContext(AppContext);

  const ErrorName = useCallback(type => {
    switch (type) {
    case "min":
      return "El nombre debe tener al menos 3 carácteres.";
    case "max":
      return "El nombre debe tener a lo más 30 carácteres.";
    default: 
      return "";
    }
  });

  const ErrorMail = useCallback(type => {
    switch (type) {
    case "min":
      return "El correo debe tener al menos 6 carácteres.";
    case "max":
      return "El correo debe tener a lo más 50 carácteres.";
    case "email":
      return "Debes ingresar un correo (Ejemplo: correo@ejemplo.com).";
    default: 
      return "";
    }
  });

  const ErrorContent = useCallback(type => {
    switch (type) {
    case "min":
      return "El mensaje debe tener al menos 5 caráctere.s";
    case "max":
      return "El mensaje debe tener a lo más 255 carácteres.";
    default: 
      return "";
    }
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [messageIsValid, setMessageIsValid] = useState(false);
  const [messageStatus, setMessageStatus] = useState("");

  const handleValidSubmit = data => {
    console.log(data);
    setMessageIsValid(true);
    setMessageStatus("El mensaje fue enviado con éxito.");

  };

  const handleInvalidSubmit = errors => {
    console.log(errors);
    setMessageIsValid(false);
    setMessageStatus("Revisa los errores e inténtalo de nuevo.");
  };

  return ( 
    <StyledContactForm action="" onSubmit={handleSubmit(handleValidSubmit, handleInvalidSubmit)}>
      {/* Name */}
      <StyledContactFormDiv>
        <StyledContactFormTag htmlFor="" anyError={errors.contactName?.message}>Nombre</StyledContactFormTag>
        <StyledContactFormInput 
          placeholder="Inserta tu nombre"
          anyError={errors.contactName?.message}
          {...register("contactName", {required: true, minLength: 3})}
        />
      </StyledContactFormDiv>
      <StyledErrorMessage>{ErrorName(errors.contactName?.type)}</StyledErrorMessage>
      {/* Mail */}
      <StyledContactFormDiv>
        <StyledContactFormTag htmlFor="" anyError={errors.contactMail?.message}>Correo electrónico</StyledContactFormTag>
        <StyledContactFormInput 
          placeholder="Inserta tu email"
          anyError={errors.contactMail?.message}
          {...register("contactMail", {required: true, minLength: 3})}
          
        />
      </StyledContactFormDiv>
      <StyledErrorMessage>{ErrorMail(errors.contactMail?.type)}</StyledErrorMessage>
      {/* Description */}
      <StyledContactFormDivArea>
        <StyledContactFormTag htmlFor="" anyError={errors.contactContent?.message}>Mensaje</StyledContactFormTag>
        <StyledContactFormTextArea 
          placeholder="Escribe tu oferta o proyecto"
          cols="30"
          rows="10"
          anyError={errors.contactContent?.message}
          {...register("contactContent", {required: true, minLength: 3})}
        ></StyledContactFormTextArea>
      </StyledContactFormDivArea>
      <StyledErrorMessage>{ErrorContent(errors.contactContent?.type)}</StyledErrorMessage>
      {/* Send */}
      <StyledContactFormSendDiv>
        <StyledContactFormButton type="submit" darkMode={darkMode}>Enviar Mensaje</StyledContactFormButton>
        <StyledContactFormSendMessage messageIsValid={messageIsValid}>
          {messageStatus}
        </StyledContactFormSendMessage>
      </StyledContactFormSendDiv>
    </StyledContactForm>
  );
}

export default ContactForm;