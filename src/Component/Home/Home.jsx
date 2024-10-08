import React from 'react';
import background from "../../assets/Bg.jpeg";
import logo1 from "../../assets/logo1.svg";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate =useNavigate()
  return (
    <>
      <div>
        <img src={background} alt="" className='bg' />
        <div className="bg-overlay d-flex flex-column justify-content-center align-items-center vh-100"> 
          <img src={logo1} alt="Logo" className='logo1 img-fluid w-25 mt-5' /> 
          
          <div className="mt-4 d-flex flex-column flex-md-row"> 

            <button onClick={()=>navigate("/user/Login")} className="btn btn-primary me-md-2 mb-2 mb-md-0 px-5" >
              Login
            </button>
            <button onClick={()=>navigate("/user/Signup")} className="btn-secondary px-5">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
