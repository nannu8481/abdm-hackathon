import { useMutation } from "react-query";
import { instanceB, instanceC } from "../services/axiosInstance";

const post = async ({ url, payload, token = true, baseurl, bearerToken }) => {
  const getCccessToken = await window.localStorage.getItem("_token");
  let headers;
  if (token) {
    headers = {
      "Api-key": process.env.REACT_APP_API_KEY,
      "Content-Type": "application/json",
    };
  }
  if (bearerToken) {
    headers = {
      accessToken: getCccessToken,
    };
  }
  if (baseurl) {
    const { data } = await instanceC.post(url, payload, { headers });
    return data;
  }
  const { data } = await instanceB.post(url, payload, { headers });
  return data;
};

const usePost = () => useMutation(post);

export default usePost;
