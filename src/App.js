import React from "react";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import LoginPage from './components/login.jsx';
import RegistrationPage from './components/registration.jsx';

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
    </Switch>
  );
};

export default App;
