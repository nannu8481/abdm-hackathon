import React, { useEffect, useContext } from "react";
import usePost from "../../hooks/usePost";
import { Wrapper } from "../../styles/SearchResults";
import { LoaderContext } from "../../context/loaderContext";
import Loader from "../../components/Loader";

const SearchResults = () => {
  const { loader, setLoader } = useContext(LoaderContext);
  const { mutateAsync, isLoading } = usePost();
  const getResults = async () => {
    let transId = window.localStorage.getItem("_transId");
    const payload = { transactionId: transId };
    try {
      await mutateAsync({
        url: "get_requests",
        payload: payload,
        bearerToken: true,
        baseurl: true,
      });
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
      </Wrapper>
    </>
  );
};

export default SearchResults;
