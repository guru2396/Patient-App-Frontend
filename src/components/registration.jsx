import React,{Component} from 'react'
import './registration.css';

import {Form ,Button} from 'react-bootstrap'

class RegistrationPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            patient_name : '',
            patient_contact : '',
            patient_email : '',
            patient_dob : '',
            patient_address : '',
            patient_gender : '',
            patient_emergency_contact : '',
            patient_emergency_contact_name : '',
            patient_govtid_type : '',
            patient_govtid : '',
            patient_password : ''
        }
        this.submitPatientRegistration = this.submitPatientRegistration.bind(this);
        this.detailsChange = this.detailsChange.bind(this);
    }

    submitPatientRegistration(event){
        alert(this.state.patient_name);
        event.preventDefault();
    }

    detailsChange(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render(){
        return (
        
            <div className="RegistrationPage">
                <h1>REGISTRATION PAGE</h1>
                <Form onSubmit = {this.submitPatientRegistration}>
                    <Form.Group className="mb-3" controlId="formBasicPatientName">
                        <Form.Label>Enter Name</Form.Label>
                        <Form.Control required type="text" name="patient_name" value={this.state.patient_name} onChange={this.detailsChange} placeholder="Your Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPatientContact">
                        <Form.Label>Enter Contact No</Form.Label>
                        <Form.Control required type="text" name="patient_contact" value={this.state.patient_contact} onChange={this.detailsChange} placeholder="Your Contact No" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type="email" name="patient_email" value={this.state.patient_email} onChange={this.detailsChange} placeholder="Enter Email" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPatientdob">
                        <Form.Label>Enter DOB</Form.Label>
                        <Form.Control required type="text" name="patient_dob" value={this.state.patient_dob} onChange={this.detailsChange} placeholder="Your DOB" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control required type="text" name="patient_address" value={this.state.patient_address} onChange={this.detailsChange} placeholder="Address" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPatientGender">
                        <Form.Label>Enter Gender</Form.Label>
                        <Form.Control required type="text" name="patient_gender" value={this.state.patient_gender} onChange={this.detailsChange} placeholder="M -> Male , F -> Female , N -> None" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPatientEmergencyContact">
                        <Form.Label>Enter Emergency Contact No</Form.Label>
                        <Form.Control required type="text" name="patient_emergency_contact" value={this.state.patient_emergency_contact} onChange={this.detailsChange} placeholder="Your Emergency Contact No" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPatientEmergencyContactName">
                        <Form.Label>Enter Emergency Contact Name</Form.Label>
                        <Form.Control required type="text" name="patient_emergency_contact_name" value={this.state.patient_emergency_contact_name} onChange={this.detailsChange} placeholder="Your Emergency Contact Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPatientGovtIdType">
                        <Form.Label>Enter GovtIdType</Form.Label>
                        <Form.Control required type="text" name="patient_govtid_type" value={this.state.patient_govtid_type} onChange={this.detailsChange} placeholder="Your GovtIdType" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPatientGovId">
                        <Form.Label>Enter GovtId</Form.Label>
                        <Form.Control required type="text" name="patient_govtid" value={this.state.patient_govtid} onChange={this.detailsChange} placeholder="Your GovtId" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" name="patient_password" value={this.state.patient_password} onChange={this.detailsChange} placeholder="Password" />
                    </Form.Group>


                    <Button size="lg" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
              
        );
    }
}

export default RegistrationPage;