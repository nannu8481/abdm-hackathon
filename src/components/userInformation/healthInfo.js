import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import usePost from "../../hooks/usePost";
import { useNavigate } from "react-router-dom";
import { Switch } from "antd";
import { Wrapper } from "../../styles/Login";
import { UserInfoContext } from "../../context/userInforContext";
import { LoaderContext } from "../../context/loaderContext";
import Loader from "../Loader";
import Modal from "../../components/Modal";

const HealthInfo = () => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = usePost();
  const [bloodDonorValue, setBloodDonorValue] = useState(false);
  const [show, setShow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { handleSubmit, register } = useForm();
  const { userInfo } = useContext(UserInfoContext);
  const { loader, setLoader } = useContext(LoaderContext);

  const onSubmit = async (data) => {
    let finalPayLoad;
    if (Object?.keys(data).length === 0) {
      finalPayLoad = {
        bloodGroup: userInfo,
      };
    } else {
      finalPayLoad = {
        bloodGroup: userInfo,
        relativeBloodGroup: data,
      };
    }

    if (bloodDonorValue) {
      const donorValue = {
        donor: true,
      };
      try {
        await mutateAsync({
          url: "users/update-donor",
          payload: donorValue,
          bearerToken: true,
          baseurl: true,
        });
      } catch (error) {
        return { error: error.response.data.message };
      }
    }
    try {
      await mutateAsync({
        url: "users/update-blood-group",
        payload: finalPayLoad,
        bearerToken: true,
        baseurl: true,
      });
      setShowModal(true);
    } catch (error) {
      return { error: error.response.data.message };
    }
  };

  useEffect(() => {
    if (isLoading) setLoader(true);
    else setLoader(false);
  }, [isLoading]);

  const onChange = (checked) => {
    setBloodDonorValue(checked);
  };

  return (
    <>
      {loader && <Loader />}
      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relativeBloodGroup">
            <h5>Add relative blood group</h5>
            <span onClick={() => setShow(!show)}>{show ? "-" : "+"}</span>
          </div>
          {show && (
            <div>
              <div>
                <h6 className="title">Please enter name</h6>
                <input {...register("name")} placeholder="enter name" />
              </div>
              <div className="inputBox">
                <h6 className="title">Please select gender</h6>
                <select {...register("gender")}>
                  <option value="female">female</option>
                  <option value="male">male</option>
                  <option value="other">other</option>
                </select>
              </div>
              <div>
                <h6 className="title">Please select date of birth</h6>
                <input
                  {...register("dateOfBirth")}
                  type="date"
                  placeholder="enter address"
                />
              </div>
              <div className="inputBox">
                <h6 className="title">Please enter blood group</h6>
                <input
                  {...register("bloodGroup")}
                  placeholder="enter blood group*"
                />
              </div>
            </div>
          )}
          <div>
            <span className="bloodDonorText">Blood Donor</span>
            <Switch onChange={onChange} />
          </div>
          <button className="button" type="submit">
            Submit
          </button>
        </form>
      </Wrapper>
      <Modal
        show={showModal}
        hide={() => {
          setShowModal(false);
          navigate("/dashboard");
        }}
        content={"Congratulations, your details are updated successfully"}
      />
    </>
  );
};

export default HealthInfo;
