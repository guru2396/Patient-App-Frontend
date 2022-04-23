import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'react-bootstrap';
import { NavLink } from "react-router-dom";


class EHRAccessLogsPage extends Component{

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
        let token = this.getCookie('patient_cookie');
        if(token===undefined){
            token = this.getCookie('nominee_cookie');
        }
        console.log(token);
        //this.setState({isLoading: true});
        fetch('http://localhost:8080/get-access-logs',{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`  
              }
        }).then(response => response.json())
        .then(data => this.setState({requests: data, isLoading: false}));
    }

    render(){
        
        const {requests,isLoading}=this.state;
        if(this.state.isLoggedIn){
            if(isLoading){
                return <p>Loading...</p>
            }
    
            const requestList=requests.map(request => {
                return <tr>
                    <td>{request.log_id}</td>
                    <td>{request.doctor_name}</td>
                    <td>{request.hospital_name}</td>
                    <td>{request.consent_id}</td>
                    <td>{request.access_details}</td>
                    <td>{request.access_purpose}</td>
                    <td>{request.timestamp}</td>
                </tr>
            });
    
            return(
                <div>
                    <Container fluid>
                        <h3>ACCESS LOGS</h3>
                        <Table className="mt-4" style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                            <thead>
                                <tr>
                                    <th>Log Id</th>
                                    <th>Doctor Name</th>
                                    <th>Hospital Name</th>
                                    <th>Consent Id</th>
                                    <th>Access Details</th>
                                    <th>Access Purpose</th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requestList}
                            </tbody>
                        </Table>
                    </Container>
                </div>
            );
        }
        else{
            return(
                <div>
                    <h1>UNAUTHORIZED</h1>
                </div>
            );
        }


    }
}

export default EHRAccessLogsPage;