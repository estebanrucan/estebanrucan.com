import { Helmet } from "react-helmet";
import Logo from "../../assets/img/logo.svg";

function Headers() {
  return ( 
    <Helmet>
      <link rel="icon" href={Logo} type="image/svg+xml" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
      <title>Portafolio de Esteban Rucán</title>
    </Helmet>
  );
}

export default Headers;