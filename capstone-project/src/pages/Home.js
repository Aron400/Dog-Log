import  Axios from "axios";
import React, {useState, useEffect} from "react";

function Home() {
  const [dog, setDog] = useState('');
  const [user, setUser] = useState('');

  const [lastFeeding, setLastFeed] = useState([]);
  const [lastWalk, setLastWalk] = useState([]);
  const [lastVet, setLastVet] = useState([]);
  // useEffect(() => {
  //   findLastFeed
  // }, []);
  const addDog = (e) => {
    e.preventDefault();
        if (dog ==='') {
            alert('field is mandatory');
            return;
        }
            console.log(dog)
            Axios.post('http://localhost:3001/addDog', {
                name: dog,
            },
            )
            .then((res) => {
                console.log("Server response: ", res);
            })
            .catch((err) => {
                console.log("Server respondend with error: ", err);
            })
            setDog('');
  }
  const addUser = (e) => {
    e.preventDefault();
        if (user ==='') {
            alert('field is mandatory');
            return;
        }
            console.log(user)
            Axios.post('http://localhost:3001/addUser', {
                name: user,
            },
            )
            .then((res) => {
                console.log("Server response: ", res);
            })
            .catch((err) => {
                console.log("Server respondend with error: ", err);
            })
            setUser('');
  }
  
  const findLastFeed = () => {
    //get most recent Feeding from database
    Axios.get("http://localhost:3001/lastFeeding").then((response) => {
      console.log(response);
    
    })
  }
  const findLastWalk = () => {
    //get most recent Walk from database
    Axios.get("http://localhost:3001/lastFeeding").then((response) => {
      console.log(response);
    
    })
    
  }
  const findLastVet = () => {
    //get most recent Vet visit from database
    Axios.get("http://localhost:3001/lastFeeding").then((response) => {
      console.log(response);
    
    })
  }

  return (
    <div className='home'>
      <h1>Home</h1>
      <h3>Last Feeding</h3>
        <div>{lastFeeding}</div>
      <h3>Last Walk</h3>
        <div>{lastWalk}</div>
      <h3>Last Vet Visit</h3>
        <div>{lastVet}</div>
      <h3>Add Dog</h3>
        <form>
          <input 
            type='text'
            name='new-dog'
            // value={}
            onChange={(e) => {
              setDog(e.target.value)
            }}
          />
          <button onClick={addDog}>Add</button>
        </form>
      <h3>Add User</h3>
        <form>
          <input 
            type='text'
            name='new-user'
            // value={}
            onChange={(e) => {
              setUser(e.target.value)
            }}
          />
          <button onClick={addUser}>Add</button>
        </form>
    </div>
  );
}

export default Home;
