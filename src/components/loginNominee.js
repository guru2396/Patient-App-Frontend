import React,{Component} from 'react';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Redirect } from 'react-router';
import './login.css';




class LoginNomineePage extends Component {


  constructor(props){
    super(props);
    this.state = {
        username : '',
        password : '',
        isLoggedIn: false
    }
    this.submitNomineeLogin = this.submitNomineeLogin.bind(this);
    this.detailsChange = this.detailsChange.bind(this);
  }



  refreshPage = () => {
    this.setState(
      {isLoggedIn: true}
     // () => this.setState({isLoggedIn: false})
    )
  }
  
  submitNomineeLogin(event){
      console.log(this.state);
      event.preventDefault();
      const headers = { 
          "Content-Type": "application/json"
      };


      
      
      axios.post('http://localhost:8080/login-nominee', this.state, { headers })
      .then(response => 
        {
            this.setState({isLoggedIn : true});
            //setting the cookie here
            document.cookie = "nominee_cookie=" + response.data;
            console.log("Cookie set");
            this.refreshPage()
            
        })
        .catch(error => {
          if(error.response.status==401){
            alert("Wrong credentials! Enter the valid credentials");
          }
          else{
            alert(error.response.status);
          }
        });
  }

  detailsChange(event){
      this.setState({
          [event.target.name]:event.target.value
      });
  }






  render(){

    if(!this.state.isLoggedIn){
      return (
        <div className="LoginPage">
          <h1>LOGIN NOMINEE PAGE</h1>
          <Form onSubmit={this.submitNomineeLogin}>
            <Form.Group size="lg" className="form" controlId="formBasicNomineeUsername">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                autoFocus
                type="text"
                value={this.state.username}
                name = "username"
                onChange={this.detailsChange}
                placeholder = "Email"
              />
            </Form.Group>
            <Form.Group size="lg" className="form" controlId="formBasicNomineePassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                value={this.state.password}
                onChange={this.detailsChange}
                placeholder="Password"
                name="password"
              />
            </Form.Group>
            <Button size="lg" type="submit">
              Login
            </Button>
          </Form>
  
        </div>
       
      );
    }
    else{
      return <Redirect to = {{ pathname: "/" }} />;
    }

  }

}

export default LoginNomineePage;