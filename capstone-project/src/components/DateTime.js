import  React, { useState , useEffect } from 'react'

export const DateTime = (props) => {

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()) )
        // return function cleanup() {
        //     clearInterval(timer)
        // }
            return timer;
    
    },[props]);

    return(
        <div>
            <p> Time : {date.toLocaleTimeString()}</p>
            <p> Date : {date.toLocaleDateString()}</p>

        </div>
    )
}

export default DateTime