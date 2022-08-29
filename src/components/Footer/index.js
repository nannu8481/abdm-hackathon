import React from "react";
import { MainContainer, Text } from "../../styles/Footer";

const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <MainContainer>
      <Text>Copyright &copy; {currentYear} | All Rights Reserved</Text>
    </MainContainer>
  );
};

export default Footer;
