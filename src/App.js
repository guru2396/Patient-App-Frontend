import React, { useState,useEffect,useRef } from "react";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import LoginPage from './components/login.js';
import RegistrationPage from './components/registration.js';
import { Redirect } from 'react-router';
import ConsentRequestsPage from './components/consentRequests';
import Createconsent from './components/Createconsent';
import LoginNomineePage from './components/loginNominee';
import AddNomineePage from './components/addNominee';



const Home = () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <h1>Home Page</h1>
      </section>
    </>
  );
};

const Login = () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <LoginPage/>
      </section>
    </>
  );
};

const Register= () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <RegistrationPage/>
      </section>
    </>
  );
};

const LoginNominee= () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <LoginNomineePage/>
      </section>
    </>
  );
};

const AddNominee= () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <AddNomineePage/>
      </section>
    </>
  );
};



const ConsentRequests= (props) => {
  
  return props.isLoggedIn ? (
    <>
      <Navbar />
      <section className="hero-section">
        <ConsentRequestsPage/>
      </section>
    </>
  ):(
    <>
      <Navbar />
      <section className="hero-section">
        <h1>UNAUTHORIZED</h1>
      </section>
    </>
  );
};

const ViewEhr= (props) => {
  return props.isLoggedIn ? (
    <>
      <Navbar />
      <section className="hero-section">
        <ConsentRequestsPage/>
      </section>
    </>
  ):(
    <>
      <Navbar />
      <section className="hero-section">
        <h1>UNAUTHORIZED</h1>
      </section>
    </>
  );
};

const EhrAccessLogs= (props) => {
  return props.isLoggedIn ? (
    <>
      <Navbar />
      <section className="hero-section">
        <ConsentRequestsPage/>
      </section>
    </>
  ):(
    <>
      <Navbar />
      <section className="hero-section">
        <h1>UNAUTHORIZED</h1>
      </section>
    </>
  );
};

const ConsentLogs= (props) => {
  return props.isLoggedIn ? (
    <>
      <Navbar />
      <section className="hero-section">
        <ConsentRequestsPage/>
      </section>
    </>
  ):(
    <>
      <Navbar />
      <section className="hero-section">
        <h1>UNAUTHORIZED</h1>
      </section>
    </>
  );
};
const Logout= () => {
  document.cookie = "patient_cookie" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  
  return <Redirect to = {{ pathname: "/login" }} />;
  
};
const LogoutNominee= () => {
  document.cookie = "nominee_cookie" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  
  return <Redirect to = {{ pathname: "/login-nominee" }} />;
  
};

const App = () => {


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





  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/register">
        <Register />
      </Route>
      <Route path="/get-consent-notifications">
        <ConsentRequests isLoggedIn={isLoggedIn}/>
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
      <Route path="/logout-nominee">
        <LogoutNominee />
      </Route>
      <Route path="/create-consent/:requestId">
        <Createconsent isLoggedIn={isLoggedIn}/>
      </Route>
      <Route path="/get-ehr">
        <ViewEhr isLoggedIn={isLoggedIn}/>
      </Route>     
      <Route path="/get-access-logs">
        <EhrAccessLogs isLoggedIn={isLoggedIn}/>
      </Route> 
      <Route path="/get-consent-logs">
        <ConsentLogs isLoggedIn={isLoggedIn}/>
      </Route>   
      <Route path="/login-nominee">
        <LoginNominee/>
      </Route>  
      <Route path="/add-nominee">
        <AddNominee/>
      </Route> 
    </Switch>
  );
};

export default App;
