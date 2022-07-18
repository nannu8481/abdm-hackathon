import React from "react";
import { GoogleContainer } from "../../styles/Wallet";
import { Wrapper, Text } from "../../styles/Navbar";

const Navbar = () => {
  return (
    <>
      <Wrapper>
        <Text>Health App</Text>
        <GoogleContainer id="google_translate_element"></GoogleContainer>
      </Wrapper>
    </>
  );
};

export default Navbar;
