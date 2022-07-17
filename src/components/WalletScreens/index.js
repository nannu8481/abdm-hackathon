import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Wallet from "../../assets/wallet.png";
import { Wrapper, Section, GoogleContainer } from "../../styles/Wallet";
import { useNavigate } from "react-router-dom";

const WalletScreens = () => {
  const navigate = useNavigate();
  const [getLoader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    setTimeout(function () {
      setLoader(false);
      navigate("/search-results");
    }, 2000);
  }, []);
  return (
    <>
      {getLoader && <Loader />}
      <Section>
        <h3>Health Wallet</h3>
        <Wrapper>
          <img src={Wallet} alt="Wallet" />
        </Wrapper>
      </Section>
    </>
  );
};

export default WalletScreens;
