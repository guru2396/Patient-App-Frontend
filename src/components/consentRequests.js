import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import axios from 'axios';

class ConsentRequestsPage extends Component{

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
        this.state={
            requests: [],
            isLoading: true,
            isLoggedIn : (this.getCookie('patient_cookie')!=undefined || this.getCookie('nominee_cookie')!=undefined) ? true : false
        };
    }



    
    componentDidMount(){
        console.log("I am here");
        let token = this.getCookie('patient_cookie');
        if(token===undefined){
            token = this.getCookie('nominee_cookie');
        }
        console.log(token);
        this.setState({isLoading: true});
        axios.get('http://localhost:8080/get-consent-notifications',{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`  
              }
        }).then(response => {
            console.log(response)
            this.setState({requests: response.data, isLoading: false})
            if(response.status===403) alert("Invalid token!! Please login again and try..")
        })
    }

    render(){
        const {requests,isLoading}=this.state;
        if(this.state.isLoggedIn){
            console.log(requests)
            if(isLoading){
                return <p>Loading...</p>
            }
            
            else{
                let requestList;
                if(requests!==undefined){
                    requestList=requests.map(request => {
                        return <tr>
                            <td>{request.consent_request_id}</td>
                            <td>{request.doctor_name}</td>
                            <td>{request.hospital_name}</td>
                            <td>{request.request_info}</td>
                            <td>{request.access_purpose}</td>
                            <td>
                                
                                <NavLink to={"/create-consent/"+request.consent_request_id}>Create Consent</NavLink>
                            </td>
                        </tr>
                    });
                }

        
                return(
                    <div style={{"width":"70vw","font-size":"1.2rem"}}>
                        <Container fluid>
                            <h1>CONSENT REQUESTS</h1>
                            <Table className="mt-4" style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                                <thead>
                                    <tr>
                                        <th>Consent Request Id</th>
                                        <th>Doctor Name</th>
                                        <th>Hospital Name</th>
                                        <th>Request Information</th>
                                        <th>Access Purpose</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requestList !== undefined ? requestList : "No Data"}
                                </tbody>
                            </Table>
                        </Container>
                    </div>
                );
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

export default ConsentRequestsPage;