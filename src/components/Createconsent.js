import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
//import './hospitallist';
import Createconsent_accrodian from './Createconsent_accrodian'
import submithandl from './Createconsent_accrodian.js';
export default function Createconsent(props) {



    const resp={
        "ehr_id": 5,
        
        "hospitalrecords": [
          {
    
            "hospitalName": "h1",
            "dataCustodianId": 1,
            "episodes": [
              {
                "episodeId": 11,
                "episodeName":45,
                "encounters": [
                  {
                    "encounterId": 1,
                    "doctorName": "bharat",
                    "op_records": [
                      {
                        "op_record_id": 90,
                        "diagnosis": "diabetis",
                        "record_details": {
                            "complaints" : "hello",
                            "prescription" : "bing",
                            "followupplan" : "raj"
                        },
                        "timestamp": "dfggdgd"
                      }
                    ]
                  },
                  {
                    "encounterId": 2,
                    "doctorName": "Rajat",
                    "op_records": [
                      {
                        "op_record_id": 900,
                        "diagnosis": "migrain",
                        "record_details": {
                            "complaints" : "headache",
                            "prescription" : "dinchak",
                            "followupplan" : "next visit after a week"
                        },
                        "timestamp": "dfggdgd"
                      }
                    ]
                  }
                ]
                
              },
              {
                "episodeId": 12,
                "episodeName":45,
                "encounters": [
                  {
                    "encounterId": 3,
                    "doctorName": "bharat1234",
                    "op_records": [
                      {
                        "op_record_id": 90,
                        "diagnosis": "diabetissssss",
                        "record_details": {
                            "complaints" : "hello",
                            "prescription" : "bing",
                            "followupplan" : "raj"
                        },
                        "timestamp": "dfggdgd"
                      }
                    ]
                  }
                ]
                
              }
    
            ]
          },
          {
    
            "hospitalName": "h2",
            "dataCustodianId": 1,
            "episodes": [
              {
                "episodeId": 12,
                "episodeName":45,
                "encounters": [
                    {
                        "encounterId": 4,
                        "doctorName": "india",
                        "op_records": [
                          {
                            "op_record_id": 90,
                            "diagnosis": "biscuitdiabetis",
                            "record_details": {
                                "complaints" : "hello",
                                "prescription" : "bing",
                                "followupplan" : "raj"
                            },
                            "timestamp": "dfggdgd"
                          }
                        ]
                      }
                ]
                
              },
              {
                "episodeId": 132,
                "episodeName":45,
                "encounters": [
                    {
                        "encounterId": 5,
                        "doctorName": "nitin",
                        "op_records": [
                          {
                            "op_record_id": 90,
                            "diagnosis": "rajma",
                            "record_details": {
                                "complaints" : "hello",
                                "prescription" : "bing",
                                "followupplan" : "raj"
                            },
                            "timestamp": "dfggdgd"
                          }
                        ]
                      }
                ]
                
              }
    
            ]
          }
        ]
      }









    // const [myStyle, setMyStyle] = useState({
    //     color: 'black',
    //     backgroundColor: 'white'
    // }) 
    let myStyle = {
        color: props.mode ==='dark'?'white':'#042743',
        backgroundColor: props.mode ==='dark'?'rgb(36 74 104)':'white', 
    }
    //const obj = resp.hospitalrecords;
    //obj.map((ob))
    //listitems = []
    let val=0;
    return (  <div>
        <h1>Create consent</h1>
        <div className="accordion">
          {resp.hospitalrecords.map(({hospitalName , dataCustodianId, episodes  }) => (
              
            <Createconsent_accrodian ehr_id={resp.ehr_id} title= {hospitalName} dataCustodianId={dataCustodianId}  content={episodes} />
          ))}
        </div>
       
      </div>
    );
    
}