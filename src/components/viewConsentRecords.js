import React,{Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
//import './hospitallist';
import Viewehr_accrodian from './Viewehr_accrodian';
import PropTypes from "prop-types";


class ViewConsentRecordsPage extends Component {

  constructor(props){
      //Data is present inside props
      //console.log(props);
      super(props);
      
      this.state = {
        isActive:true
      }
  }
  static propTypes = {
      match: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired
  };
  componentDidMount(props){
      console.log("Inside thisssssssss")
      console.log(this.props)
  }
  render(){
    console.log("Inside return")
    console.log(this.props);
      return (  
          <div style={{"width":"80vw","font-size":"1.3rem", "overflow":"auto"}}>
            <h1>CONSENT DETAILS</h1>
            <div className="accordion" style={{"overflow":"auto","fontSize":"2.0rem"}}>
            {this.props.location.state.obj.map(({dataCustodianId , episodes  }) => (
              
             // <Createconsent_accrodian ehr_id={this.state.resp.ehrId} title= {hospitalName} dataCustodianId={hospitalId}  content={episodes} id={this.props.match.params.requestId} />
              <div className="accordion-item">
                <div className="accordion-title" name="isActive" onClick={() => this.setState({isActive:this.state.isActive ? false : true})}>
                 <div>{dataCustodianId}</div>
                 <div>{this.state.isActive ? '-' : '+'}</div>
                </div>
                {
                  this.state.isActive && <div className="accordion-content">
                   {
                     episodes.map(({episodeId, encounterDetails  }) => (
                       <div>
                        <h3>Episodes:</h3>
                              <li className="episodes">Episode Id : {episodeId}</li>
                        {
                         encounterDetails.map(({encounterId})=>(
                          <div>
                            <h3 className="episodes">Encounters :</h3>  
                         
                            <div className="row">
                              <div className="col-md-6">
                              </div>
                            </div>
                           
                            <li className="encounter">Encounter Id : {encounterId}</li>
                           
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
}
export default ViewConsentRecordsPage;