import { StyledContactContainer, StyledContactContent, StyledContactInfo, StyledContactSection, StyledContactTitle } from "./styles";
import {StyledSectionSubtitle, StyledSectionTitle} from "../../../../assets/styles";
import {BiMailSend} from "react-icons/bi";
import {BsMessenger, BsWhatsapp} from "react-icons/bs";
import ContactCard from "./Card";
import ContactForm from "./Form";
import { useContext } from "react";
import { AppContext } from "../../../context/Context";


function Contact() {

  const {refContact, darkMode} = useContext(AppContext);

  const INFO = [
    {icon: BiMailSend,  title: "Email", data: "errucan@uc.cl", link: "mailto:errucan@uc.cl"},
    {icon: BsWhatsapp, title:"Whatsapp", data: "Háblame directamente", link: "https://wa.me/56975162103" },
    {icon: BsMessenger, title: "Messenger", data: "estebanrucan",  link: "https://m.me/estebanrucan"},
  ];

  return ( 
    <StyledContactSection id="contact" ref={refContact}>
      <StyledSectionSubtitle darkMode={darkMode}>Conversemos</StyledSectionSubtitle>
      <StyledSectionTitle>Contáctame</StyledSectionTitle>

      <StyledContactContainer>
        <StyledContactContent>
          <StyledContactTitle>Formas de contacto</StyledContactTitle>

          <StyledContactInfo>
            {
              INFO.map(info => (
                <ContactCard 
                  key={info.title}
                  title={info.title}
                  data={info.data}
                  link={info.link}
                  icon={info.icon}
                />
              ))
            }
          </StyledContactInfo>
        </StyledContactContent>

        <StyledContactContent>
          <StyledContactTitle>Escríbeme tu oferta o proyecto</StyledContactTitle>
          <ContactForm />
        </StyledContactContent>

      </StyledContactContainer>
    </StyledContactSection>
  );
}

export default Contact;