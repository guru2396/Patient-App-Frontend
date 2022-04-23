import React,{Component} from 'react';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { withRouter } from "react-router";
import './login.css';




class VerifyOtpPage extends Component {


  constructor(props){
    super(props);
    this.state = {
        otp : '',
        isLoggedInStatus: false,
        isOtpVerified : false,

    }
    this.submitOtpVerification = this.submitOtpVerification.bind(this);
    this.detailsChange = this.detailsChange.bind(this);
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };


  submitOtpVerification(event){
      console.log(this.state);
      console.log(this.props);
      event.preventDefault();
      //const token = this.getCookie('doctor_cookie');
      const headers = { 
        "Content-Type": "application/json" ,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      };

      
      
      axios.post('http://localhost:8080/validate-otp/'+this.props.match.params.patientId+'/'+this.state.otp, this.state, {headers})
      .then(response => 
        {
          if(response.status===200){
            alert("Otp Validation Successful!");
            this.setState({isOtpVerified:true});
          }
          else{
            alert("Wrong Otp Entered Try again");
          }
          }
      );
  }

  detailsChange(event){
      this.setState({
          [event.target.name]:event.target.value
      });
  }


  



  render(){
    const {match,location,history} = this.props;
    if(!this.state.isOtpVerified){
      return (
        <div className="VerifyOtp">
          <h1>Verify Otp</h1>
          <Form onSubmit={this.submitOtpVerification}>
            <Form.Group size="lg" className="form" controlId="formBasicVerifyOtp">
              <Form.Label>Enter Otp</Form.Label>
              <Form.Control
                required
                autoFocus
                type="text"
                value={this.state.otp}
                name = "otp"
                onChange={this.detailsChange}
                placeholder = "Enter Otp send to your mail"
              />
            </Form.Group>
            <Button size="lg" type="submit">
              Verify Otp
            </Button>
          </Form>
  
        </div>
       
      );
    }
    else{
      return <Redirect to = {{ pathname: "/login-patient" }} />;
    }

  }

}

//export default VerifyOtpPage;
const CreateConsentWithRouter = withRouter(VerifyOtpPage);
export default CreateConsentWithRouter;