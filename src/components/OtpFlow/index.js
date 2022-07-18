import React, { useState, useEffect, useContext } from "react";
import OtpInput from "react-otp-input";
import { useNavigate, useLocation } from "react-router-dom";
import usePost from "../../hooks/usePost";
import { Wrapper, OtpWrapper } from "../../styles/Login";
import { LoginValueContext } from "../../context/loginValueContext";
import { LoaderContext } from "../../context/loaderContext";
import Loader from "../Loader";
import { getLocation } from "../../helpers/getLocation";

const OtpFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutateAsync, isLoading } = usePost();
  const [value, setValue] = useState();
  const { loginValue } = useContext(LoginValueContext);
  const { loader, setLoader } = useContext(LoaderContext);

  const handleChange = (otp) => setValue(otp);

  const handleClick = async () => {
    setLoader(true);
    window.navigator.geolocation.getCurrentPosition(
      successCallback,
      failureCallback
    );
  };

  const successCallback = async (position) => {
    setLoader(false);
    setLoader(true);
    const check = await getLocation(
      position?.coords?.latitude,
      position?.coords?.longitude
    );
    setLoader(false);
    let city;
    if (check.city) city = check?.city;
    else {
      city = check?.locality;
    }
    const payload = {
      token: loginValue,
      confirmationCode: value,
      issueSignupCredential: false,
    };
    try {
      const getAccessToken = await mutateAsync({
        url: "users/sign-in-passwordless/confirm",
        payload: payload,
        token: true,
      });
      window.localStorage.setItem("_token", getAccessToken?.accessToken);
      const finalPayload = {
        location: city,
        lat: position?.coords?.latitude?.toString(),
        long: position?.coords?.longitude?.toString(),
        lastReportedDate: new Date().toLocaleDateString(),
        lastReportedTime: new Date().toLocaleTimeString(),
        phoneNumber: location?.state?.mobileNumber,
      };
      try {
        await mutateAsync({
          url: "users",
          payload: finalPayload,
          bearerToken: true,
          baseurl: true,
        });
        navigate("/user-details");
      } catch (error) {
        return error;
      }
    } catch (error) {
      return { error: error.response.data.message };
    }
  };

  const failureCallback = (failure) => {
    setLoader(false);
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
          <OtpWrapper>
            <OtpInput
              value={value}
              onChange={handleChange}
              numInputs={6}
              separator={<span>-</span>}
            />
          </OtpWrapper>

          <button
            disabled={value?.length > 5 ? false : true}
            className={value?.length > 5 ? "active button" : "disabled button"}
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
