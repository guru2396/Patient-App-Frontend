import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
//import './hospitallist';
import Viewehr_accrodian from './Viewehr_accrodian';
export default function ViewEhr(props) {



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
                    "encounterId": 8,
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
                    "encounterId": 10,
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
                    "encounterId": 1,
                    "doctorName": "bharat1234",
                    "op_records": [
                      {
                        "op_record_id": 2,
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
                "episodeId": 3,
                "episodeName":45,
                "encounters": [
                    {
                        "encounterId": 88,
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
                        "encounterId": 88,
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
        <h1>EHR Records</h1>
        <div className="accordion">
          {resp.hospitalrecords.map(({hospitalName , dataCustodianId, episodes  }) => (
              
            <Viewehr_accrodian title= {hospitalName}  content={episodes} />
          ))}
        </div>
      </div>
    );
    
}