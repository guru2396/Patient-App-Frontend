import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { Redirect } from 'react-router';
import './viewconsent.css';
import { withRouter } from "react-router";

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
            viewRecords : false,
            sendThis : {"name":"Iash","Roll":"James"},
            isLoggedIn : false
        };
        this.revoke=this.revoke.bind(this);
        this.view=this.view.bind(this);
    }




    
    componentDidMount(){
        let token = this.getCookie('patient_cookie');
        if(token===undefined){
            token = this.getCookie('nominee_cookie');
        }
        
        axios.get('http://localhost:8080/retrieve-consents',{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then(response => 
            {
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
          );


    }


    view(){
        console.log(this.state.sendThis)
        this.setState({viewRecords:true});
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
            if(this.state.viewRecords){
                return <Redirect to = {{ pathname: "/view-consent-record",state: { obj:  this.state.sendThis} }} />
            }

    
            const requestList=requests.map(request => {
                return <tr>
                    <td>{request.consent_id}</td>
                    <td>{request.doctor_name}</td>
                    <td>{request.access_purpose}</td>
                    <td>{request.delegate_access}</td>
                    <td>{request.creation_date}</td>
                    <td>{request.validity}</td>
                    <td style={{"margin":"0 auto","width":"100"}}>
                        
                        <Button className="buttonsize" value={request.consent_id}  size="lg" onClick={this.revoke}>Revoke </Button>
                    </td>
                    <td style={{"margin":"0 auto","width":"100"}}>
                        
                        <Button className="buttonsize" value={request.consent_id}  size="lg" onClick={this.view}>View</Button>
                    </td>
                </tr>
            });
    
            return(
                <div className="tableDiv" style={{"overflow":"auto", "width":"80vw"}}>
                    <Container fluid>
                        <h1>VIEW CONSENSTS</h1>
                        <Table className="mt-4" style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                            <thead>
                                <tr>
                                    <th>Consent Id</th>
                                    <th>Doctor Name</th>
                                    <th>Access Purpose</th>
                                    <th>Delegate Access</th>
                                    <th>Creation Date</th>
                                    <th>Validity</th>
                                    <th>Revoke Consent</th>
                                    <th>View Consent</th>
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

//export default ViewConsentsPage;
const CreateConsentWithRouter = withRouter(ViewConsentsPage);
export default CreateConsentWithRouter;