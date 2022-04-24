import React,{ useState, useEffect, Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
//import './hospitallist';
import axios from 'axios';
import Createconsent_accrodian from './Createconsent_accrodian'
import Button from "react-bootstrap/Button";
import submithandl from './Createconsent_accrodian.js';
import { Redirect } from 'react-router';
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import './Createconsent.css';

class CreateConsentsPage extends Component{

  constructor(props){
    super(props);
    this.state = {
      resp : "",
      load: false,
      isActive:true,
      purpose: "",
      delegateaccess:"",
      signature:"",
      languages: [],
      isConsentCreated : false,
      isLoggedIn : (this.getCookie('patient_cookie')!=undefined || this.getCookie('nominee_cookie')!=undefined) ? true : false

    }
    this.submithandl = this.submithandl.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.detailsChange = this.detailsChange.bind(this);
  }
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  getCookie =(cName)=>{
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
    console.log("Did Mount")
    const token=this.getCookie('patient_cookie')
      axios.get('http://localhost:8080/get-ehr',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => 
        {
          if(response.status===200){
            
            // alert("Registered successfully "+response.data);
            this.setState({resp: response.data});
            console.log("Responmse")
            console.log(this.state.resp);
          }
          else{
              alert("Error")
          }
          console.log("return post method");
          //console.log(response);
           console.log(response);
          // xPaths = response.data.xPaths;
        }
      );
  }

  submithandl=()=>{

    //console.log(typeof props.id)
    console.log(this.state.languages);
    let i;
      let arr=[];
      for(i=0;i<this.state.languages.length;i++)
      {
        arr[i]=JSON.parse(this.state.languages[i]);
      }
      this.setState({
        languages: arr
      });
      console.log("Printing type")
      console.log(typeof this.state.languages);
    let data={
      "consent_request_id":   this.props.match.params.requestId,
      "ehr_id": JSON.stringify(this.state.resp.ehrId),
      // "dataCustodianId": JSON.stringify(props.dataCustodianId),
      "selectedRecords": arr,
      "purpose": this.state.purpose,
      "delegateAccess": this.state.delegateaccess,
      "signature": this.state.signature
    }
    console.log(data.selectedRecords);


    const getCookie=(cName)=> {
      const name = cName + "=";
      const cDecoded = decodeURIComponent(document.cookie); //to be careful
      const cArr = cDecoded .split('; ');
      let res;
      cArr.forEach(val => {
          if (val.indexOf(name) === 0) res = val.substring(name.length);
      });
      return res;
    }
    const token=getCookie('patient_cookie');
    const headers = { 
      "Authorization": `Bearer ${token}` 
    };
  

    axios.post('http://localhost:8080/create-consent', data, { headers })
      .then(response => 
        {
          if(response.status===200){

            this.setState({isConsentCreated:true});
            alert("Created Consent successfully with Id : " + response.data);
            
            //console.log("Responmse")
            //console.log(this.state.resp);
          }
          else{
              alert("Error")
          }

        }
      );

  };

  handleChange = (e) => {
    // Destructuring
   
    //obj.eid = e.target.value[0];
    //obj.encid = 
    const { value, checked } = e.target;
    const { languages } = this.state.languages;
    let ar=value.split(",");
    const obj = {
      "encounterId": ar[1],
      "episodeId": ar[0],
      "hospitalId":ar[2]
    };
    //console.log("value" + value);
    
    
    // Case 1 : The user checks the box
    if (checked) {
      // setUserInfo({
      //   languages: [...languages, JSON.stringify(obj)]
      // });
      this.setState({
        languages: [...this.state.languages, JSON.stringify(obj)]
      });
      console.log(this.state.languages);
    }
    
  
    // Case 2  : The user unchecks the box
    else {
      console.log(checked);
      this.setState({
        languages: this.state.languages.filter((e) => e !== JSON.stringify(obj))
      });
      console.log("Inside")
      // 
      console.log(this.state.languages);
    }
  
  }

     
    myStyle = {
      color: this.props.mode ==='dark'?'white':'#042743',
      backgroundColor: this.props.mode ==='dark'?'rgb(36 74 104)':'white', 
    };

    detailsChange(event){
      this.setState({
          [event.target.name]:event.target.value
      });
  }

  /*detailsChange1(event){
    this.setState({
      languages: [...this.state.languages, event.target.value]
    })
}*/
 
  render(){
    console.log("Render");
    if(this.state.isLoggedIn){
      if(!this.state.isConsentCreated){
        if(this.state.resp.hospitalRecords!=undefined){
          return (  
            <div style={{"width":"80vw","font-size":"1.3rem", "overflow":"auto"}}>
              <h1>CREATE CONSENT</h1>
              {console.log("print "+this.props.match.params.requestId)}
               <div className="accordion" style={{"overflow":"auto","fontSize":"2.0rem"}}>
                  {this.state.resp.hospitalRecords.map(({hospitalName , hospitalId, episodes  }) => (
                    
                   // <Createconsent_accrodian ehr_id={this.state.resp.ehrId} title= {hospitalName} dataCustodianId={hospitalId}  content={episodes} id={this.props.match.params.requestId} />
                   <div className="accordion-item">
                   <div className="form-floating mt-3 mb-3 text-center">
             
                     {console.log("hello ")}
                     {console.log( this.state.languages)}
             
                   </div>
                   <div className="accordion-title" name="isActive" onClick={this.detailsChange}>
                     <div>{hospitalName}</div>
                     <div>{this.state.isActive ? '-' : '+'}</div>
                   </div>
                   {
                     this.state.isActive && <div className="accordion-content">
                     {
                       episodes.map(({encounters , episodeId, episodeName  }) => (
                         <div>
                           <h3>Episodes:</h3>
                                 <li className="episodes">Episode Id : {episodeId}</li>
                                 <li className="episodes">Episode Name : {episodeName}</li>
                           {
                             encounters.map(({doctorName,encounterId,op_records})=>(
                               <div>
                                 <h3 className="episodes">Encounters :</h3>  
             
                                 <div className="row">
                                   <div className="col-md-6">
                                     <input
                                       className="form-check-input"
                                       type="checkbox"
                                       name="languages"
                                       value={[episodeId,encounterId, hospitalId]}
                                       id="flexCheckDefault"
                                       onClick={this.handleChange}
                                     />
                                   </div>
                                 </div>
                                 <li className="encounter">Doctor Name : {doctorName}</li>
                                 <li className="encounter">Encounter Id : {encounterId}</li>
                                 {
                                       op_records.map(({diagnosis,op_record_id,recordDetails,timestamp})=>(
                                         <div>
                                           <h3 className="encounter">OpRecords:</h3>
                                           <li className="op_records">Diagnosis : {diagnosis}</li>
                                           <li className="op_records">Op Record Id : {op_record_id}</li>
                                           <li className="op_records">Details : {recordDetails}</li>
                                           <li className="op_records">Timestamp : {timestamp}</li>                                          
                                         </div>
                                       ))
                                 }
                               </div>
                             ))
                           }
                         </div>
                       ))
                     }
                     </div>
                   } 
                   
                 </div>
                 
                 ))}
              </div>
              <div>
                <input type="text" name="delegateaccess" placeholder="delegateaccess(Yes or No)" value={this.state.delegateaccess} onChange={this.detailsChange} style={{"margin-top":"20px"}}></input><br/><br/>
                <input type="text" name="purpose" placeholder="Purpose" value={this.state.purpose} onChange={this.detailsChange}></input><br/><br/>
                <input type="text" name="signature" placeholder="Signature" value={this.state.signature} onChange={this.detailsChange}></input><br/><br/>
                <Button size="lg" type="submit" onClick={this.submithandl}>Create consent</Button>
              </div>
            
            </div>
          );
        }
        else{
          return <h1>No data</h1>
        }
      }
      else{
        return <Redirect to = {{ pathname: "/view-consents" }} />;
      }

    }
    else{
      return(
        <div>
          <h1>UNAUTHORIZED</h1>
        </div>
      );
    }

  }

};

  
  
const CreateConsentWithRouter = withRouter(CreateConsentsPage);
export default CreateConsentWithRouter;
