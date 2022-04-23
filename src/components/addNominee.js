import React,{Component} from 'react';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Redirect } from 'react-router';
import './login.css';




class AddNomineePage extends Component {

  getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded .split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
  }

  constructor(props){
    super(props);
    const token = this.getCookie('patient_cookie');
    this.state = {
        nominee_name : '',
        nominee_email : '',
        nominee_contact : '',
        patientLoggedInStatus: token===undefined ? false : true,
        nomineeAddedStatus : false
    }
    this.submitAddNominee = this.submitAddNominee.bind(this);
    this.detailsChange = this.detailsChange.bind(this);
  }



  submitAddNominee(event){
      console.log(this.state);
      event.preventDefault();
      const token = this.getCookie('patient_cookie');
      const headers = { 
        'Authorization': `Bearer ${token}`  
        
      };


      
      
      axios.post('http://localhost:8080/add-nominee', this.state, { headers })
      .then(response => 
        {
            console.log(response);
            alert("Nominee Added SuccessFully!! Your password for login is : " + response.data.nominee_code);
            this.setState({nomineeAddedStatus : true});

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
    //console.log(this.state.patientLoggenInStatus)
    if(this.state.patientLoggedInStatus){
      if(!this.state.nomineeAddedStatus){
        return (
          <div className="LoginPage">
            <h1>ADD NOMINEE PAGE</h1>
            <Form onSubmit={this.submitAddNominee}>
              <Form.Group size="lg" className="form" controlId="formBasicNomineeName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  autoFocus
                  type="text"
                  value={this.state.nominee_name}
                  name = "nominee_name"
                  onChange={this.detailsChange}
                  placeholder = "Name"
                />
              </Form.Group>
              <Form.Group size="lg" className="form" controlId="formBasicNomineeEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={this.state.nominee_email}
                  onChange={this.detailsChange}
                  placeholder="Email"
                  name="nominee_email"
                />
              </Form.Group>
              <Form.Group size="lg" className="form" controlId="formBasicNomineeContact">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={this.state.nominee_contact}
                  onChange={this.detailsChange}
                  placeholder="Contact"
                  name="nominee_contact"
                />
              </Form.Group>
              <Button size="lg" type="submit">
                Add
              </Button>
            </Form>
    
          </div>
         
        );
      }
      else{
        return <Redirect to = {{ pathname: "/login-nominee" }} />;
      }

    }
    else{
      return (
        <div>
          <h1>UNAUTHORIZED</h1>
        </div>
      );
    }


  }

}

export default AddNomineePage;