import { useState } from "react";
import Routes from "./components/routing";
import { LoginValueContext } from "./context/loginValueContext";
import { LoaderContext } from "./context/loaderContext";
import { UserInfoContext } from "./context/userInforContext";

function App() {
  const [loginValue, setLoginValue] = useState(null);
  const [loader, setLoader] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  return (
    <LoginValueContext.Provider value={{ loginValue, setLoginValue }}>
      <LoaderContext.Provider value={{ loader, setLoader }}>
        <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
          <Routes />
        </UserInfoContext.Provider>
      </LoaderContext.Provider>
    </LoginValueContext.Provider>
  );
}

export default App;
