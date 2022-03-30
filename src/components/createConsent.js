import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { withRouter } from "react-router";
import PropTypes from "prop-types";

class CreateConsent extends Component{

    componentDidMount(){

    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      };
    
      render() {
          console.log(this.props.match.params.requestId)
        const { match, location, history } = this.props;
    
        return <div><h2>You are now at {this.props.match.params.requestId}</h2></div>;
      }
}
const CreateConsentWithRouter = withRouter(CreateConsent);
export default CreateConsentWithRouter;