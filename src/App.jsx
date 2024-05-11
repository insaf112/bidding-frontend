import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Routes/Header";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";

import "./App.css";
import MainRoutes from "./Routes/MainRoutes";
import { toast } from "react-toastify";

const App = () => {
  return (
    <>
      {/* <div className="flex flex-col h-screen"> */}
      <Router>
        <MainRoutes />
        {/* <Header />
          <Routes>
            <Route path="/" exact element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes> */}
      </Router>
      {/* </div> */}
    </>
  );
};

export default App;
