import { useQuery } from "react-query";
import axiosInstance, { cryptoInstance } from "services/axiosInstance";

const useGet = (key, url, crypto, configs) => {
  const get = async () => {
    if (crypto) {
      const { data } = await cryptoInstance.get(url);
      return data;
    } else {
      let headers;
      const token = localStorage.getItem("_auth");
      if (configs.token)
        headers = {
          "Auth-token": token,
        };
      const { data } = await axiosInstance.get(url, { headers });
      return data;
    }
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
