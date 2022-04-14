import React, { useState,useEffect,useRef } from "react";
import "./navbar.css";


import { NavLink } from "react-router-dom";



const Navbar = () => {


  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  

  
  const [isLoggedIn, setLoggedInStatus] = useState(false);

  //useEffect is called during loading component,on changes to component and on leaving(unmounting) a component

  const isInitialMount = useRef(true);
  //Restricting useEffect to run only on updates except initial mount
  useEffect(() => {
    if (isInitialMount.current) {
      let cookie = getCookie("patient_cookie"); 
      if(cookie!=null){
        setLoggedInStatus(true);
        
      }
       isInitialMount.current = false;
    } else {
        // Your useEffect code here to be run on update
        let cookie = getCookie("patient_cookie"); 
        if(cookie!=null){
          setLoggedInStatus(true);
          
        }
        else{
          setLoggedInStatus(false);
        }
      
       
    }
  });


 


  const [showMediaIcons, setShowMediaIcons] = useState(false);

  //if(isLoggedIn){
    return !isLoggedIn ? (
      <>
        <nav className="main-nav">
          {/* 1st logo part  */}
          <div className="logo">
            <h2>
              <span>P</span>atient
              <span>A</span>pp
            </h2>
          </div>
  
          {/* 2nd menu part  */}
          <div
            className={
              showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
            }>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>      
              </ul>
          </div>
  
          
        </nav>
      </>

    ):
    (
      <>
        <nav className="main-nav">
          {/* 1st logo part  */}
          <div className="logo">
            <h2>
              <span>P</span>atient
              <span>A</span>pp
            </h2>
          </div>
  
          {/* 2nd menu part  */}
          <div
            className={
              showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
            }>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>

              <li>
                <NavLink to="/get-consent-notifications">Consent Requests</NavLink>
              </li>

              <li>
                <NavLink to="/get-ehr">View Ehr</NavLink>
              </li>
              <li>
                <NavLink to="/get-access-logs">Ehr Access Logs</NavLink>
              </li>
              <li>
                <NavLink to="/get-consent-logs">Consent Logs</NavLink>
              </li>
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
            </ul>
          </div>
  
          
        </nav>
      </>
    );


};

export default Navbar;
