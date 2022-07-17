import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../../styles/Login";
import { UserInfoContext } from "../../context/userInforContext";
import Navbar from "../Navbar";

const UserInformation = () => {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: "",
      gender: "",
      dateOfBirth: "",
      bloodGroup: "",
    },
  });
  const { setUserInfo } = useContext(UserInfoContext);

  const onSubmit = (data) => {
    setUserInfo(data);
    navigate("/user-heath-details");
  };

  return (
    <>
      <Navbar />
      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h6 className="text">Lets Complete Your Health Profile</h6>
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
          <button className="button" type="submit">
            Next
          </button>
        </form>
      </Wrapper>
    </>
  );
};

export default UserInformation;
