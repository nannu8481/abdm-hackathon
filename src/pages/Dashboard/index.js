import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Wrapper } from "../../styles/Login";
import { useNavigate } from "react-router-dom";
import usePost from "../../hooks/usePost";
import { LoaderContext } from "../../context/loaderContext";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const navigate = useNavigate();
  const { loader, setLoader } = useContext(LoaderContext);
  const { handleSubmit, register } = useForm();
  const [getData, setData] = useState(null);
  const { mutateAsync, isLoading } = usePost();

  const handleClick = async (data) => {
    setData(data);
  };

  useEffect(() => {
    if (getData) {
      setLoader(true);
      window.navigator.geolocation.getCurrentPosition(
        successCallback,
        failureCallback
      );
    }
  }, [getData]);

  const successCallback = async (position) => {
    setLoader(false);
    setLoader(false);
    if (getData) {
      const updatedData = {
        message: {
          intent: {
            fulfillment: {
              type: "EMERGENCY-PICKUP, DROP",
              start: {
                instructions: {
                  long_desc: getData?.address,
                  short_desc: "landmarks",
                },
                contact: {
                  tags: {
                    "@abdm/gov/in/lat": position?.coords?.latitude,
                    "@abdm/gov/in/long": position?.coords?.longitude,
                  },
                },
              },
              tags: {
                "@abdm/gov/in/bloodgroup": getData?.bloodGroup,
                "@abdm/gov/in/radius": getData?.radius,
              },
            },
          },
        },
      };
      try {
        const reponse = await mutateAsync({
          url: "search",
          payload: updatedData,
          bearerToken: true,
          baseurl: true,
        });
        window.localStorage.setItem("_transId", reponse?.transactionId);
        navigate("/wallet-screen");
      } catch (error) {
        return { error: error.response.data.message };
      }
    }
  };

  const viewResulst = async () => {
    try {
      const response = await mutateAsync({
        url: "view_requests",
        // payload: updatedData,
        bearerToken: true,
        baseurl: true,
      });
      console.log("response", response);
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
        <form onSubmit={handleSubmit(handleClick)}>
          <h4 className="text">Help Campaign</h4>
          <div className="formInfo">
            <div>
              <h3 className="title">Please enter bloodgroup</h3>
              <input
                {...register("bloodGroup")}
                placeholder="Enter bloodgroup"
              />
            </div>
            <div>
              <h6 className="title">Please enter address</h6>
              <input {...register("address")} placeholder="nter address" />
            </div>
            <div>
              <h6 className="title">Please enter radius</h6>
              <input {...register("radius")} placeholder="Enter radius" />
            </div>
          </div>
          <button className="button" type="submit">
            Submit
          </button>
          <div className="DonateBlood" onClick={() => viewResulst()}>
            Post Request to donate blood
          </div>
        </form>
      </Wrapper>
    </>
  );
};

export default Dashboard;
