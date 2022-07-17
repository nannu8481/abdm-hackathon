import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router-dom";
import Login from "../../pages/Login";
import Otp from "../../pages/Otp";

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/login" element={<Login />} />
        <Route path="/get-otp" element={<Otp />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
