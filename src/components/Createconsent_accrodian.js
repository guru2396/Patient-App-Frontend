import React, { useState } from 'react';
import axios from 'axios';
import './Accordian.css'

const Createconsent_accrodian = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [purpose, setpurpose] = useState("");
  const [delegateaccess, setdelegateaccess] = useState("no");
  const [signature, setsignature] = useState("");
  const [userinfo, setUserInfo] = useState({
    languages: []
  });
const  handlepurpose=(e) =>{    setpurpose(e.target.value);  
}
  const handledelegateaccess=(e) =>{    setdelegateaccess(e.target.value);  }
  const  handlesignature=(e) =>{  setsignature( e.target.value);  }
  const handleChange = (e) => {
    // Destructuring
   
    //obj.eid = e.target.value[0];
    //obj.encid = 
    const { value, checked } = e.target;
    const { languages } = userinfo;
    let ar=value.split(",")
    const obj = {
      "encounterId": ar[1],
      "episodeId": ar[0]
    };
    console.log("value" + value);
    
    
    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        languages: [...languages, JSON.stringify(obj)]
      });
    }
  
    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        languages: languages.filter((e) => e !== JSON.stringify(obj))
      });
    }


   
  };

  const submithandl=()=>{

    console.log(typeof props.id)
    let data={
      "consent_request_id":   props.id,
      "ehr_id": JSON.stringify(props.ehr_id),
      "dataCustodianId": JSON.stringify(props.dataCustodianId),
      "selectedRecords": [JSON.parse(userinfo.languages)],
      "purpose": purpose,
      "delegateAccess": delegateaccess,
      "signature": signature
    }
    console.log(data.selectedRecords);


    const getCookie=(cName)=> {
      const name = cName + "=";
      const cDecoded = decodeURIComponent(document.cookie); //to be careful
      const cArr = cDecoded .split('; ');
      let res;
      cArr.forEach(val => {
          if (val.indexOf(name) === 0) res = val.substring(name.length);
      })
      return res;
    }
    const token=getCookie('patient_cookie');
    const headers = { 
      "Authorization": `Bearer ${token}` 
    };
  

     axios.post('http://localhost:8080/create-consent', data, { headers })
      .then(response => 
        {
          alert(response.data);
           console.log(response);
        });

  };

  return (
    
    <div className="accordion-item">
      <div className="form-floating mt-3 mb-3 text-center">

        {console.log("hello " + userinfo.languages)}

      </div>
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div>{props.title}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {
        isActive && <div className="accordion-content">
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

                    <div className="row">
                      <div className="col-md-6">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="languages"
                          value={[episodeId,encounterId]}
                          id="flexCheckDefault"
                          onClick={handleChange}
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
      <input type="text" name="delegateaccess" placeholder="delegateaccess(Yes or No)" value={delegateaccess} onChange={handledelegateaccess}></input><br/><br/>
      <input type="text" name="purpose" placeholder="Purpose" value={purpose} onChange={handlepurpose}></input><br/><br/>
      <input type="text" name="signature" placeholder="Signature" value={signature} onChange={handlesignature}></input><br/><br/>
      <button value={props.title} onClick={submithandl}>Create consent</button>
    </div>
  );
};

export default Createconsent_accrodian;