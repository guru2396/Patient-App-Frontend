import React, { useState } from 'react';

import './Accordian.css'

const Viewehr_accrodian = (props) => {
  const [isActive, setIsActive] = useState(false);
   //console.log(props.title)
   //console.log(props.content[0].episodeId)
  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div>{props.title}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      
      {isActive && <div className="accordion-content">
      {
        
      props.content.map(({encounters , episodeId, episodeName  }) => (

              <div>
                  <h3>Episodes:</h3>
                        <li className="episodes">Episode Id : {episodeId}</li>
                        <li className="episodes">Episode Name : {episodeName}</li>
                
                  {
                    encounters.map(({doctorName,encounterId,op_records})=>(
                       <div>
                           <h3 className="episodes">Encounters :</h3>
                           <li className="encounter">Doctor Name : {doctorName}</li>
                           <li className="encounter">Encounter Id : {encounterId}</li>
                               
                           {
                                op_records.map(({diagnosis,op_record_id,record_details,timestamp})=>(
                                  <div>
                                    <h3 className="encounter">OpRecords:</h3>
                                    <li className="op_records">Diagnosis : {diagnosis}</li>
                                    <li className="op_records">Op Record Id : {op_record_id}</li>
                                    <li className="op_records">Complaints : {record_details.complaints}</li>
                                    <li className="op_records">Prescription : {record_details.prescription}</li>  
                                    <li className="op_records">Followup Plan : {record_details.followupplan}</li>                                       
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
  );
};

export default Viewehr_accrodian;