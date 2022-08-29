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
  const { handleSubmit } = useForm();
  const { mutateAsync, isLoading } = usePost();
  const [value, setValue] = useState();
  const { setLoginValue } = useContext(LoginValueContext);
  const { loader, setLoader } = useContext(LoaderContext);

  const onSubmit = async () => {
    const payload = { username: value };
    // return;
    try {
      const getMobileOtp = await mutateAsync({
        url: "users/sign-in-passwordless",
        payload: payload,
        token: true,
      });
      console.log("getMobileOtp", getMobileOtp);
      setLoginValue(getMobileOtp);
      navigate("/get-otp", {
        state: {
          mobileNumber: value,
        },
      });
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
          <h4 className="text">Please enter your mobile number</h4>
          <div className="formInfo">
            <PhoneInput
              placeholder="Enter phone number"
              value={value}
              onChange={setValue}
            />
            <button className="button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Wrapper>
    </>
  );
};

export default LoginFlow;
