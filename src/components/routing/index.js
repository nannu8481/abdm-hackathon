import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router-dom";
import Login from "../../pages/Login";
import Otp from "../../pages/Otp";
import UserInfoScreen from "../../pages/UserInfo";
import HealthInfo from "../../components/userInformation/healthInfo";
import Dashboard from "../../pages/Dashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/login" element={<Login />} />
        <Route path="/get-otp" element={<Otp />} />
        <Route path="/user-details" element={<UserInfoScreen />} />
        <Route path="/user-heath-details" element={<HealthInfo />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
