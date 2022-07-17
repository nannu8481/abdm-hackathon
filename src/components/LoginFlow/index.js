import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import usePost from "../../hooks/usePost";
import { Wrapper } from "../../styles/Login";
import PhoneInput from "react-phone-number-input";
import { LoginValueContext } from "../../context/loginValueContext";
import { LoaderContext } from "../../context/loaderContext";
import Loader from "../Loader";

const LoginFlow = () => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = usePost();
  const [value, setValue] = useState();
  const { setLoginValue } = useContext(LoginValueContext);
  const { loader, setLoader } = useContext(LoaderContext);
  const { register, handleSubmit } = useForm();
  const onSubmit = async () => {
    console.log(value);
    const payload = { username: value };
    // return;
    try {
      const getMobileOtp = await mutateAsync({
        url: "users/sign-in-passwordless",
        payload: payload,
        token: true,
      });
      setLoginValue(getMobileOtp);
      navigate("/get-otp");
      console.log("getMobileOtp", getMobileOtp);
      // return getMobileOtp;
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <h6 className="text">Please enter your mobile number</h6>
          <div>
            <PhoneInput
              placeholder="Enter phone number"
              value={value}
              onChange={setValue}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </Wrapper>
    </>
  );
};

export default LoginFlow;
