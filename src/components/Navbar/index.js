import React from "react";
import { GoogleContainer } from "../../styles/Wallet";
import { Wrapper, Text, Logo } from "../../styles/Navbar";
import NHALOGO from "../../assets/logo.png";

const Navbar = () => {
  return (
    <>
      <Wrapper>
        <Logo src={NHALOGO} />
        <Text>Health App</Text>
        <GoogleContainer id="google_translate_element"></GoogleContainer>
      </Wrapper>
    </>
  );
};

export default Navbar;
