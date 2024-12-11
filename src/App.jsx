import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./Component/UserLayout/UserLayout";
import Signup from "./Component/Signup/Signup";
import Login from "./Component/Login/Login";
import Layout from "./Component/Layout/Layout";
import Dashboard from "./Component/Dashboard/Dashboard";
import Home from "./Component/Home/Home";
import Otp from "./Component/OTP/Otp";
import HomePage from "./Component/HomePage/HomePage";
import Admin from "./Component/Admin/Admin";

function App() {
  return (
    <>
    
    <Routes>
      {/* User layout with Sign In & Sign Up */}
      <Route path="/user" element={<UserLayout />}>
        <Route path="Signup" element={<Signup />} />
        <Route path="Login" element={<Login />} />
        
      </Route>

      {/* Main layout for authenticated routes */}
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} /> 
        <Route path="dashboard" element={<Dashboard />} /> 
        <Route path="Otp" element={<Otp />} /> 
        <Route path="HomePage" element={<HomePage/>} /> 
        <Route path="Admin" element={<Admin/>} /> 


      </Route>
    </Routes>
    </>
  );
}

export default App;
