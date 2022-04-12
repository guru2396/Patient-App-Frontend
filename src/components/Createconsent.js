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
      load: false
    }
  }
  
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

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

     
    myStyle = {
      color: this.props.mode ==='dark'?'white':'#042743',
      backgroundColor: this.props.mode ==='dark'?'rgb(36 74 104)':'white', 
    }



    //const obj = resp.hospitalrecords;
    //obj.map((ob))
    //listitems = []
   // let val=0;
    render(){
      console.log("Render");
      if(this.state.resp.hospitalRecords!=undefined){
        return (  

        
          <div>
            <h1>Create consent</h1>
            {console.log("print "+this.props.match.params.requestId)}
             <div className="accordion">
                {this.state.resp.hospitalRecords.map(({hospitalName , hospitalId, episodes  }) => (
                  
                  <Createconsent_accrodian ehr_id={this.state.resp.ehrId} title= {hospitalName} dataCustodianId={hospitalId}  content={episodes} id={this.props.match.params.requestId} />
                ))}
            </div>
            
          
          </div>
        );
      }
      else{
        return <h1>No data</h1>
      }

    }

}
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