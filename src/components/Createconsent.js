import React,{ useState, useEffect, Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
//import './hospitallist';
import axios from 'axios';
import Createconsent_accrodian from './Createconsent_accrodian'
import submithandl from './Createconsent_accrodian.js';
import { withRouter } from "react-router";
import PropTypes from "prop-types";

class Createconsent extends Component{

  constructor(props){
    super(props);
    this.state = {
      resp : "",
      load: false,
      isActive:true,
      purpose: "",
      delegateaccess:"",
      signature:"",
      languages: []

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
      axios.get('http://localhost:8087/get-ehr',{
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
      console.log(this.state.languages);
    let data={
      "consent_request_id":   this.props.match.params.requestId,
      "ehr_id": JSON.stringify(this.state.resp.ehrId),
      // "dataCustodianId": JSON.stringify(props.dataCustodianId),
      "selectedRecords": this.state.languages,
      "purpose": this.purpose,
      "delegateAccess": this.delegateaccess,
      "signature": this.signature
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
  

    axios.post('http://localhost:8090/create-consent', data, { headers })
      .then(response => 
        {
          alert(response.data);
           console.log(response);
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
      if(this.state.resp.hospitalRecords!=undefined){
        return (  
          <div>
            <h1>Create consent</h1>
            {console.log("print "+this.props.match.params.requestId)}
             <div className="accordion">
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
            <input type="text" name="delegateaccess" placeholder="delegateaccess(Yes or No)" value={this.state.delegateaccess} onChange={this.detailsChange}></input><br/><br/>
                 <input type="text" name="purpose" placeholder="Purpose" value={this.state.purpose} onChange={this.detailsChange}></input><br/><br/>
                 <input type="text" name="signature" placeholder="Signature" value={this.state.signature} onChange={this.detailsChange}></input><br/><br/>
                 <button onClick={this.submithandl}>Create consent</button>
            </div>
          
          </div>
        );
      }
      else{
        return <h1>No data</h1>
      }
  }

};

  
  //   render(){
  //     console.log("Render");
  //     if(this.state.resp.hospitalRecords!=undefined){
  //       return (  
  //         <div>
  //           <h1>Create consent</h1>
  //           {console.log("print "+this.props.match.params.requestId)}
  //            <div className="accordion">
  //               {this.state.resp.hospitalRecords.map(({hospitalName , hospitalId, episodes  }) => (
                  
  //                // <Createconsent_accrodian ehr_id={this.state.resp.ehrId} title= {hospitalName} dataCustodianId={hospitalId}  content={episodes} id={this.props.match.params.requestId} />
  //                <div className="accordion-item">
  //                <div className="form-floating mt-3 mb-3 text-center">
           
  //                  {console.log("hello " + userinfo.languages)}
           
  //                </div>
  //                <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
  //                  <div>{props.title}</div>
  //                  <div>{isActive ? '-' : '+'}</div>
  //                </div>
  //                {
  //                  isActive && <div className="accordion-content">
  //                  {
  //                    props.content.map(({encounters , episodeId, episodeName  }) => (
  //                      <div>
  //                        <h3>Episodes:</h3>
  //                              <li className="episodes">Episode Id : {episodeId}</li>
  //                              <li className="episodes">Episode Name : {episodeName}</li>
  //                        {
  //                          encounters.map(({doctorName,encounterId,op_records})=>(
  //                            <div>
  //                              <h3 className="episodes">Encounters :</h3>  
           
  //                              <div className="row">
  //                                <div className="col-md-6">
  //                                  <input
  //                                    className="form-check-input"
  //                                    type="checkbox"
  //                                    name="languages"
  //                                    value={[episodeId,encounterId, hospitalId]}
  //                                    id="flexCheckDefault"
  //                                    onClick={handleChange}
  //                                  />
  //                                </div>
  //                              </div>
  //                              <li className="encounter">Doctor Name : {doctorName}</li>
  //                              <li className="encounter">Encounter Id : {encounterId}</li>
  //                              {
  //                                    op_records.map(({diagnosis,op_record_id,recordDetails,timestamp})=>(
  //                                      <div>
  //                                        <h3 className="encounter">OpRecords:</h3>
  //                                        <li className="op_records">Diagnosis : {diagnosis}</li>
  //                                        <li className="op_records">Op Record Id : {op_record_id}</li>
  //                                        <li className="op_records">Details : {recordDetails}</li>
  //                                        <li className="op_records">Timestamp : {timestamp}</li>                                          
  //                                      </div>
  //                                    ))
  //                              }
  //                            </div>
  //                          ))
  //                        }
  //                      </div>
  //                    ))
  //                  }
  //                  </div>
  //                } 
                 
  //              </div>
               
  //              ))}
  //           </div>
  //           <div>
  //           <input type="text" name="delegateaccess" placeholder="delegateaccess(Yes or No)" value={delegateaccess} onChange={handledelegateaccess}></input><br/><br/>
  //                <input type="text" name="purpose" placeholder="Purpose" value={purpose} onChange={handlepurpose}></input><br/><br/>
  //                <input type="text" name="signature" placeholder="Signature" value={signature} onChange={handlesignature}></input><br/><br/>
  //                <button value={props.title} onClick={submithandl}>Create consent</button>
  //           </div>
          
  //         </div>
  //       );
  //     }
  //     else{
  //       return <h1>No data</h1>
  //     }

  //   };

  // }
const CreateConsentWithRouter = withRouter(Createconsent);
export default CreateConsentWithRouter;
//export default Createconsent;


// export default function Createconsent(props) {


//   const resp = "";
//   const getCookie =(cName)=>{
//     const name = cName + "=";
//     const cDecoded = decodeURIComponent(document.cookie); //to be careful
//     const cArr = cDecoded .split('; ');
//     let res;
//     cArr.forEach(val => {
//         if (val.indexOf(name) === 0) res = val.substring(name.length);
//     })
//     return res;
//   }
//   console.log("Inside")
  
//     console.log("I sm hjere")
//     const token=getCookie('patient_cookie')
//       axios.get('http://localhost:8080/get-ehr',{
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       })
//       .then(response => 
//         {
//           if(response.status===200){
//              // alert("Registered successfully "+response.data);
//               resp = response.data
//               console.log(response.data);
//           }
//           else{
//               alert("Error")
//           }
//           console.log("return post method");
//           //console.log(response);
//            console.log(response);
//           // xPaths = response.data.xPaths;
//         }
//      );
 
      

//     let myStyle = {
//         color: props.mode ==='dark'?'white':'#042743',
//         backgroundColor: props.mode ==='dark'?'rgb(36 74 104)':'white', 
//     }
//     //const obj = resp.hospitalrecords;
//     //obj.map((ob))
//     //listitems = []
//     let val=0;
//     return (  <div>
//         <h1>Create consent</h1>
//         <div className="accordion">
//           {resp.hospitalRecords.map(({hospitalName , hospitalId, episodes  }) => (
              
//             <Createconsent_accrodian ehr_id={resp.ehrId} title= {hospitalName} dataCustodianId={hospitalId}  content={episodes} />
//           ))}
//         </div>
       
//       </div>
//     );
    
// }