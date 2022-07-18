import React, { useState, useEffect, useContext } from "react";
import usePost from "../../hooks/usePost";
import { Wrapper, Section } from "../../styles/SearchResults";
import { LoaderContext } from "../../context/loaderContext";
import Loader from "../../components/Loader";

const SearchResults = () => {
  const { loader, setLoader } = useContext(LoaderContext);
  const { mutateAsync, isLoading } = usePost();
  const [data, setData] = useState(null);
  const getResults = async () => {
    let transId = window.localStorage.getItem("_transId");
    const payload = { transactionId: transId };
    try {
      const results = await mutateAsync({
        url: "get_requests",
        payload: payload,
        bearerToken: true,
        baseurl: true,
      });
      setData(results?.messages);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (isLoading) setLoader(true);
    else setLoader(false);
  }, [isLoading]);

  useEffect(() => {
    getResults();
  }, []);
  return (
    <>
      {loader && <Loader />}
      <Wrapper>
        <button className="refreshButton" onClick={() => getResults()}>
          Refresh Results
        </button>
        <Section>
          {data?.map((item, index) => {
            return (
              <div className="card">
                <h3>phone number : {item?.phoneNumber}</h3>
                {/* <h3>blood group: {item?.bloodGroup}</h3> */}
                <h3>name: {item?.name}</h3>
              </div>
            );
          })}
        </Section>
      </Wrapper>
    </>
  );
};

export default SearchResults;
