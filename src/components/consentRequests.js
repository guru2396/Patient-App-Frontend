import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'react-bootstrap';

class ConsentRequestsPage extends Component{
    constructor(props){
        super(props);
        this.state={requests: [], isLoading: true};
    }

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


    
    componentDidMount(){
        const token = this.getCookie('patient_cookie');
        this.setState({isLoading: true});
        fetch('http://localhost:8080/get-consent-notifications',{
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`  
              }
        }).then(response => response.json())
        .then(data => this.setState({requests: data, isLoading: false}));
    }

    render(){
        
        const {requests,isLoading}=this.state;
        if(isLoading){
            return <p>Loading...</p>
        }

        const requestList=requests.map(request => {
            return <tr>
                <td>{request.consent_request_id}</td>
                <td>{request.doctor_name}</td>
                <td>{request.hospital_name}</td>
                <td>{request.request_info}</td>
                <td>{request.access_purpose}</td>
                <td>
                    <Button size="sm" color="primary">Create Consent</Button>
                </td>
            </tr>
        });

        return(
            <div>
                <Container fluid>
                    <h3>Consent requests</h3>
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
                            {requestList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );

    }
}

export default ConsentRequestsPage;