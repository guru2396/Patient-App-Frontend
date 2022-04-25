import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import axios from 'axios';

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
            isLoggedIn : false
            
        };
    }




    
    componentDidMount(){
        let token = this.getCookie('patient_cookie');
        if(token===undefined){
            token = this.getCookie('nominee_cookie');
        }


        axios.get('http://localhost:8080/get-access-logs',{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then(response => 
            {
                console.log(response);
              if(response.status===200){
                
                // alert("Registered successfully "+response.data);
                this.setState({isLoggedIn: true});
                this.setState({requests:response.data,isLoading:false})
                
              }
              else{
                this.setState({isLoggedIn: false});
                alert("Error : " + response.status);
              }
            }
          )
          .catch(err =>{
              alert(err);
          });



    }

    render(){
        
        const {requests,isLoading}=this.state;
        if(this.state.isLoggedIn){

    
            let requestList;
            if(requests!==undefined){
                requestList = requests.map(request => {
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
            }

    
            return(
                <div className="tableDiv" style={{"overflow":"auto","width":"70vw"}}>
                    <Container fluid>
                        <h1>ACCESS LOGS</h1>
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