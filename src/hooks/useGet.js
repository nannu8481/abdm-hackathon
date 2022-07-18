import { useQuery } from "react-query";
import { instanceB, instanceC } from "../services/axiosInstance";

const useGet = (key, url, configs, baseurl, bearerToken) => {
  const get = async () => {
    let headers;
    const getAccessToken = await window.localStorage.getItem("_token");

    if (bearerToken) {
      headers = {
        accessToken: getAccessToken,
      };
    }
    if (baseurl) {
      const { data } = await instanceC.get(url, { headers });
      return data;
    }
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
