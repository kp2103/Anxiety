import React, { useState } from 'react'
import './../home.css'
export default function Home() {

    const inputs = [
        {
            name : 'study_load',
            title: 'Enter your study load (1-4):',
            ex: [
                'high load (4) : 3-4 assignment per week,studying 2-3 hours per day',
                'mormal load (2) : 1-2 assignment per week,studying 2-3 hours per day,'
            ],
            max:4,
            min : 1
            
        },
        {
            name : 'academic_performance',
            title: 'Enter your academic_performance (1-5)',
            ex: [
                'Level 1: Very Poor : mostly D and F',
                'Average 3: mostly B and some C',
                'Excellent 5: mostly A'
            ],
            max:5,
            min : 1
        },
        {
            name :'teacher_student_relationship',
            title: 'Enter your relationship with teacher (1-5)',
            ex: [
                'very poor (1): Minimal to no positive interactions. The teacher and student rarely communicate outside of necessary classroom activities.',
                'Average 3 : Neutral interactions. Communication is functional but lacks warmth or personal connection.',
                'Excellent 5 : Highly positive interactions. The teacher and student have a strong rapport and communicate openly.'
            ],
            max:5,
            min : 1
        },
        {
            name :'future_career_concerns' ,
            title: 'Enter your future career concerns (1-5)',
            ex: [
                'Very Low Concern (1): The student has a very clear idea of their future career path and is confident in achieving it',
                'Moderate Concern 3 : The student has some idea of potential career paths but lacks a clear direction.',
                'Very High Concern 5 : The student has no clear idea about their future career path and feels completely lost'
            ],
            max:5,
            min : 1
        },
        {
            name : 'sleep_quality',
            title: 'Enter your sleep quality (1-5)',
            ex: [
                'Very Poor (1): Frequently sleeps less than 4 hours per night',
                'Average 3 : Generally sleeps 6-7 hours per night',
                'Excellent 5 : Consistently sleeps 8 or more hours per night'
            ],
            max:5,
            min : 1
        },
        {
            name : 'breathing_problem',
            title: 'Enter your breathing problem (0-5)',
            ex: [
                'None 0: No breathing problems at any time.',
                'Mild 2 : Occasional breathing problems, such as mild shortness of breath during heavy exercise',
                'Excellent 4 : Frequent breathing problems, including shortness of breath with minimal physical activity',
                'Very Severe 5 : Constant or nearly constant breathing problems, with shortness of breath even at rest'
            ],
            max:5,
            min : 0
        },
        {
            name : 'headache',
            title: 'Enter your headaches problem (0-5)',
            ex: [
                'No Headache 0: No headaches at any time.',
                'Mild 2 : Mild headaches occurring once or twice a month',
                'Excellent 4 : Severe headaches occurring weekly or more frequently',
                'Very Severe 5 : Very severe headaches occurring several times a week or daily'
            ],
            max:5,
            min : 0
        },
    ]

    const v = {
        study_load : 1,
        academic_performance : 1,
        teacher_student_relationship : 1,
        future_career_concerns : 1,
        headache : 0,
        sleep_quality : 1,
        breathing_problem :0
    }

    const [value,setValue] = useState(v)

    const handleValue = (e)=>{
        setValue({...value,[e.target.name]:parseInt(e.target.value)})
    }

    const generateData = async()=>{
        try{
            const response = await fetch('/getPrediction',{
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify(value)
            }) 
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            alert(data.result);
    
        }
        catch(e)
        {
            console.log(e)
        }
    } 

    const generateOptions = (min, max) => {
        const options = [];
        for (let i = min; i <= max; i++) {
          options.push(
            <option key={i} 
                onClick={(e)=>{console.log(e)}}
            value={i}>
              {i}
            </option>
          );
        }
        return options;
      };

    return (
        <div className='main' style={{display : 'grid',justifyContent :'center',alignItems : 'center',paddingBottom : '3rem',color : 'whitesmoke'}}>
            {inputs.map((item, index) => {
                return (
                    <div>
                        <h3>{item.title}</h3>
                        {item.ex.map((exitem, index) => {
                            return (
                                <p>{exitem}</p>
                            )
                        })}
                        
                        <select className="form-select form-select-lg mb-3" name={item.name} aria-label="Default select example" onClick={(e)=>{
                            e.preventDefault()
                            handleValue(e)
                            // console.log(e.target.value)
                            }}>
                            <>
                                {generateOptions(item.min,item.max)}
                            </>
                        </select>
                    </div>
                )
            })}
            <button className="btn btn-outline-success btns" style={{color : 'whitesmoke'}} onClick={()=>{
                console.log(value)
                generateData()
            }}>Predict</button>
        </div>
    )
}
