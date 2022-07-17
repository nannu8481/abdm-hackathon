import { useState } from "react";
import Routes from "./components/routing";
import { LoginValueContext } from "./context/loginValueContext";
import { LoaderContext } from "./context/loaderContext";

function App() {
  const [loginValue, setLoginValue] = useState(null);
  const [loader, setLoader] = useState(false);
  return (
    <LoginValueContext.Provider value={{ loginValue, setLoginValue }}>
      <LoaderContext.Provider value={{ loader, setLoader }}>
        <Routes />
      </LoaderContext.Provider>
    </LoginValueContext.Provider>
  );
}

export default App;
