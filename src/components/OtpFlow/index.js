import React, { useState, useEffect, useContext } from "react";
import OtpInput from "react-otp-input";
import usePost from "../../hooks/usePost";
import { Wrapper } from "../../styles/Login";
import { LoginValueContext } from "../../context/loginValueContext";
import { LoaderContext } from "../../context/loaderContext";
import Loader from "../Loader";

const OtpFlow = () => {
  const { mutateAsync, isLoading } = usePost();
  const [value, setValue] = useState();
  const { loginValue } = useContext(LoginValueContext);
  const { loader, setLoader } = useContext(LoaderContext);

  const handleChange = (otp) => setValue(otp);

  const handleClick = async () => {
    console.log(value, loginValue);
    const payload = {
      token: loginValue,
      confirmationCode: value,
      issueSignupCredential: false,
    };
    try {
      const getMobileOtp = await mutateAsync({
        url: "users/sign-in-passwordless/confirm",
        payload: payload,
        token: true,
      });
      console.log("getMobileOtp", getMobileOtp);
    } catch (error) {
      return { error: error.response.data.message };
    }
  };

  useEffect(() => {
    if (isLoading) setLoader(true);
    else setLoader(false);
  }, [isLoading]);
  return (
    <>
      {loader && <Loader />}
      <Wrapper>
        <div className="otpWrapper">
          <h6 className="text">Please enter otp</h6>
          <OtpInput
            value={value}
            onChange={handleChange}
            numInputs={6}
            separator={<span>-</span>}
          />
          <button
            disabled={value?.length > 5 ? false : true}
            className={value?.length > 5 ? "active" : "disabled"}
            onClick={() => handleClick()}
          >
            Submit
          </button>
        </div>
      </Wrapper>
    </>
  );
};

export default OtpFlow;
