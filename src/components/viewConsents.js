import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import axios from 'axios';

class ViewConsentsPage extends Component{

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
        this.revoke=this.revoke.bind(this);
    }




    
    componentDidMount(){
        let token = this.getCookie('patient_cookie');
        if(token===undefined){
            token = this.getCookie('nominee_cookie');
        }
        this.setState({isLoading: true});
        fetch('http://localhost:8080/retrieve-consents',{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`  
              }
        }).then(response => response.json())
        .then(data => this.setState({requests: data, isLoading: false}));
    }

    revoke(e){
     console.log(e.target.value);
     const token = this.getCookie('patient_cookie');
     console.log(token);
     const headers = { 
        "Authorization": `Bearer ${token}` 
      };
    
  
       axios.post('http://localhost:8080/revoke-consent/'+e.target.value,this.state, { headers })
        .then(response => 
          {
            alert(response.data);
            this.setState({isLoading: false});
            this.componentDidMount();
            console.log(response);
          });

    }

    render(){
        
        const {requests,isLoading}=this.state;
        if(this.state.isLoggedIn){
            if(isLoading){
                return <p>Loading...</p>
            }
    
            const requestList=requests.map(request => {
                return <tr>
                    <td>{request.consent_id}</td>
                    <td>{request.doctor_name}</td>
                    <td>{request.access_purpose}</td>
                    <td>{request.delegate_access}</td>
                    <td>{request.creation_date}</td>
                    <td>{request.validity}</td>
                    <td style={{"padding":"0", "width":"200"}}>
                        
                        <Button value={request.consent_id} style={{"padding":"0","margin":"0"}} size="lg" onClick={this.revoke}>Revoke Consent</Button>
                    </td>
                </tr>
            });
    
            return(
                <div className="tableDiv" style={{"overflow":"auto", "width":"70vw"}}>
                    <Container fluid>
                        <h3>VIEW CONSENSTS</h3>
                        <Table className="mt-4" style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                            <thead>
                                <tr>
                                    <th>Consent Id</th>
                                    <th>Doctor Name</th>
                                    <th>Access Purpose</th>
                                    <th>Delegate Access</th>
                                    <th>Creation Date</th>
                                    <th>Validity</th>
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
            return (
                <div>
                    <h1>UNAUTHORIZED</h1>
                </div>
            )
        }


    }
}

export default ViewConsentsPage;