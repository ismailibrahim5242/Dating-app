import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
const [loading,setLoading]=useState();
useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
        setLoading(false)
    },3000)
},[])

  return (
    <>
    {loading ? (
<div className="loading">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div> 

    ):(
    <>
      <Outlet/>
   </>
    )}
    </>
 )
}
    

export default UserLayout