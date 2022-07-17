import React, { useEffect } from "react";
import useGet from "../../hooks/useGet";
import Navbar from "../../components/Navbar";

const SearchResults = () => {
  const { refetch } = useGet("user-search-details", "_search", false, {
    bearerToken: true,
    baseurl: true,
  });

  useEffect(() => {
    refetch();
  }, []);
  return (
    <>
      <Navbar />
      <div>searching...</div>
    </>
  );
};

export default SearchResults;
