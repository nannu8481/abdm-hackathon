import { useQuery } from "react-query";
import { instanceB } from "../services/axiosInstance";

const useGet = (key, url, configs) => {
  const get = async () => {
    let headers;
    const token = localStorage.getItem("_auth");
    if (configs.token)
      headers = {
        "Auth-token": token,
      };
    const { data } = await instanceB.get(url, { headers });
    return data;
  };

  const defaultConfig = {
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
    ...configs,
  };
  return useQuery(key, get, defaultConfig);
};

export default useGet;
