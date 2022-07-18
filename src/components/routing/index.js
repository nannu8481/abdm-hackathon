import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router-dom";
import Login from "../../pages/Login";
import Otp from "../../pages/Otp";
import UserInfoScreen from "../../pages/UserInfo";
import HealthInfo from "../../components/userInformation/healthInfo";
import Dashboard from "../../pages/Dashboard";
import WalletScreens from "../../components/WalletScreens";
import SearchResults from "../../pages/SearchResults";
import BookAppointment from "../../pages/BookAppointment";

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<Login />} />
        <Route path="/get-otp" element={<Otp />} />
        <Route path="/user-details" element={<UserInfoScreen />} />
        <Route path="/user-heath-details" element={<HealthInfo />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wallet-screen" element={<WalletScreens />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
