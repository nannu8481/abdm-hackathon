import { useMutation } from "react-query";
import { instance, instanceB } from "../services/axiosInstance";

const post = async ({ url, payload, token = true }) => {
  let headers;
  if (token) {
    // const authToken = localStorage.getItem("_auth");
    headers = {
      "Api-key": process.env.REACT_APP_API_KEY,
      "Content-Type": "application/json",
    };
  }
  // 20-2387-1480-0580 abha number
  const { data } = await instanceB.post(url, payload, { headers });
  return data;
};

const usePost = () => useMutation(post);

export default usePost;
