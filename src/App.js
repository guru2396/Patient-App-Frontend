import React from "react";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import LoginPage from './components/login.js';
import RegistrationPage from './components/registration.js';
import { Redirect } from 'react-router';
import ConsentRequestsPage from './components/consentRequests';
import CreateConsent from './components/createConsent';

let isLoggedIn = false;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

let cookie = getCookie("patient_cookie"); 
if(cookie!=null){
  isLoggedIn = true;
  //alert("cookie there");
}
else{
  isLoggedIn = false;
}



const Home = () => {

  return (
    <>
      <Navbar />
      <section className="hero-section">
        <h1>Patient App Home Page</h1>
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

const ConsentRequests= () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <ConsentRequestsPage/>
      </section>
    </>
  );
};


const Logout= () => {
  document.cookie = "patient_cookie" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  
  return <Redirect to = {{ pathname: "/login" }} />;
  
};


const App = () => {
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
        <ConsentRequests />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
      <Route path="/create-consent/:requestId">
        <CreateConsent />
      </Route>
    </Switch>
  );
};

export default App;
