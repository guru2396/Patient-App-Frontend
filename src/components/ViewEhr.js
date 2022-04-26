import React,{Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
//import './hospitallist';
import axios from 'axios';
import Viewehr_accrodian from './Viewehr_accrodian';

class ViewEhrPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      resp : {},
      isActive:true,
      isLoggedIn : (this.getCookie('patient_cookie')!=undefined || this.getCookie('nominee_cookie')!=undefined) ? true : false

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

          }
          else{
              alert("Error")
          }

        }
      );
  }






  render(){
    if(this.state.resp.hospitalRecords!==undefined){
      return (  
        <div style={{"width":"80vw","font-size":"1.3rem", "overflow":"auto"}}>
          <h1>VIEW EHR</h1>
          <div className="accordion" style={{"overflow":"auto","fontSize":"2.0rem"}}>
              {this.state.resp.hospitalRecords.map(({hospitalName , hospitalId, episodes  }) => (
                
               // <Createconsent_accrodian ehr_id={this.state.resp.ehrId} title= {hospitalName} dataCustodianId={hospitalId}  content={episodes} id={this.props.match.params.requestId} />
               <div className="accordion-item">
               <div className="accordion-title" name="isActive" onClick={() => this.setState({isActive:this.state.isActive ? false : true})}>
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
          
        
  
        </div>
      );
  
  
  
    } 
    else{
      return(
       <h1></h1>
      )
    }     
  }


    
}
export default ViewEhrPage;