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
    setLoader(true);
    window.navigator.geolocation.getCurrentPosition(
      successCallback,
      failureCallback
    );
  };

  const successCallback = async (position) => {
    console.log(position);
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
        await mutateAsync({
          url: "search",
          payload: updatedData,
          bearerToken: true,
          baseurl: true,
        });
      } catch (error) {
        return { error: error.response.data.message };
      }
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
          <h6 className="text">Help Campaign</h6>
          <div>
            <div>
              <h6 className="title">Please enter bloodgroup</h6>
              <input
                {...register("bloodGroup")}
                placeholder="enter bloodgroup"
              />
            </div>
            <div>
              <h6 className="title">Please enter address</h6>
              <input {...register("address")} placeholder="enter address" />
            </div>
            <div>
              <h6 className="title">Please enter radius</h6>
              <input {...register("radius")} placeholder="enter radius" />
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

export default Dashboard;
