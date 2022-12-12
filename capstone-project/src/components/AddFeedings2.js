import React, { useState, useEffect } from 'react'
import Axios from 'axios';

function AddFeedings(props) {
    const [dog, setDog] = useState("");
    const [user, setUser] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        Axios.post('http://localhost:3001/feeding', {
            dog: dog,
            user: user,
            date: date
            })
            props.addFeedingHandler({
                dog: dog,
                user: user,
                date: date
            })
            console.log(dog)
            
            setDog("");
            setUser("");
      }, [setDate]);

    const addData = (e) => {
        e.preventDefault();
        if (dog ==='' || user ==='') {
            alert('All fields mandatory');
            return;
        }
        let d = new Date(); 
        let displayDate = d.toLocaleString()
        console.log(displayDate)               
        setDate(displayDate.toString(), () => {
            
        })
        
        
    }
  
    return (
    <div>
      <div className='feeding'>
                    <h1>Feeding</h1>
                <form className='feeding-form' >
                    <h3>Add Walk</h3>
                    <div className='field'>
                    <label>Dog:</label>
                        <input 
                        type='text'
                        name='dog'
                        
                        onChange={(e) => setDog(e.target.value)}         
                        /><br />
                    <label>User:</label>
                    <input 
                        type='text'
                        name='user'
                        
                        onChange={(e) => setUser(e.target.value)}          
                        /><br />
                    <button onClick={addData}>Add Feeding</button>
                    </div>
                </form>
            </div>
    </div>
  )
}

export default AddFeedings
