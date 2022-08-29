import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MainWrapper } from "../../styles/Login";

const BookAppointment = () => {
  const location = useLocation();
  const [userData, setUserData] = useState("");

  useEffect(() => {
    console.log(location);
    setUserData(location?.state?.data);
  });
  return (
    <MainWrapper>
      <h1>Please book your appointent</h1>
      <div>
        <div className="heading">
          Book your appointment with <b>{userData?.name}</b>
        </div>
        <button onClick={() => alert("booked")}>
          Click here to book your appoinment
        </button>
      </div>
    </MainWrapper>
  );
};

export default BookAppointment;
