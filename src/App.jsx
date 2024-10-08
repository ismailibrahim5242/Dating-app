import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";

// Importing Components
import UserLayout from "./Component/UserLayout/UserLayout";
import Signup from "./Component/Signup/Signup";
import Login from "./Component/Login/Login";
import Layout from "./Component/Layout/Layout";

function App() {
  return (
    <Routes>
      {/* User layout with Sign In & Sign Up */}
      <Route path="/user" element={<UserLayout />}>
        <Route path="Signup" element={<Signup />} />
        <Route path="Login" element={<Login />} />
      </Route>

      {/* Main pages */}
      <Route path="/" element={<Layout />}>
      </Route>
    </Routes>
  );
}

export default App;
