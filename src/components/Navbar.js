import React, { useState,useEffect,useRef } from "react";
import "./navbar.css";


import { NavLink } from "react-router-dom";



const Navbar = () => {


  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  

  
  const [isPatientLoggedIn, setPatientLoggedInStatus] = useState(false);
  const [isNomineeLoggedIn, setNomineeLoggedInStatus] = useState(false);

  //useEffect is called during loading component,on changes to component and on leaving(unmounting) a component

  const isInitialMount = useRef(true);
  //Restricting useEffect to run only on updates except initial mount
  useEffect(() => {
    if (isInitialMount.current) {
      let pat_cookie = getCookie("patient_cookie");
      let nom_cookie = getCookie("nominee_cookie"); 
      if(nom_cookie!=null && pat_cookie!=null){
        setPatientLoggedInStatus(true);
        setNomineeLoggedInStatus(true);
      }
      else if(nom_cookie!=null){
        setNomineeLoggedInStatus(true);
      }
      else if(pat_cookie!=null){
        setPatientLoggedInStatus(true);
      }
       isInitialMount.current = false;
    } else {
        // Your useEffect code here to be run on update
        let pat_cookie = getCookie("patient_cookie");
        let nom_cookie = getCookie("nominee_cookie"); 
        if(nom_cookie!=null && pat_cookie!=null){
          setPatientLoggedInStatus(true);
          setNomineeLoggedInStatus(true);
        }
        else if(nom_cookie!=null){
          setNomineeLoggedInStatus(true);
        }
        else if(pat_cookie!=null){
          setPatientLoggedInStatus(true);
        }
      
       
    }
  });


 


  const [showMediaIcons, setShowMediaIcons] = useState(false);

  //if(isPatientLoggedIn){
    return !isPatientLoggedIn && !isNomineeLoggedIn ?  (
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
                <NavLink to="/login">Patient Login </NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>      
              <li>
                <NavLink to="/login-nominee">Nominee Login</NavLink>
              </li> 
              </ul>
          </div>
  
          
        </nav>
      </>

    ): isPatientLoggedIn && !isNomineeLoggedIn ?
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
                <NavLink to="/view-consents">View Consents</NavLink>
              </li>
              <li>
                <NavLink to="/get-access-logs">Ehr Access Logs</NavLink>
              </li>

              <li>
                <NavLink to="/add-nominee">Add Nominee</NavLink>
              </li>
              <li>
                <NavLink to="/logout">Logout</NavLink>
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
                <NavLink to="/view-consents">View Consents</NavLink>
              </li>
              <li>
                <NavLink to="/logout-nominee">Logout</NavLink>
              </li>
            </ul>
          </div>
  
          
        </nav>
      </>      
    );


};

export default Navbar;
