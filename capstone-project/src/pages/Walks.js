import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./pages.css";




function Walks() {
  const [walking, setWalking] = useState('');
  const [walkList, setWalkList] = useState([]);
  const [dog, setDog] = useState('');
  const [user, setUser] = useState('');
  const [date, setDate] = useState('');
  const [dogList, setDogList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [usersID, setUsersID] = useState('');
  const [dogsID, setDogsID] = useState('');

  const componentDidMount = () => {
    console.log('testing')
    Axios.get("http://localhost:3001/users").then((res) => {
      const users = res.data;
      setUserList(users);
    });
    Axios.get("http://localhost:3001/dogs").then((res) => {
      const dogs = res.data;
      setDogList(dogs);
    });
  }

  const addWalking = (e) => {
    e.preventDefault();
        if (dog ==='' || user ==='') {
            alert('field is mandatory');
            return;
        }
        let dateUnform = new Date();
        let displayDate = dateUnform.toLocaleString();
        setDate(displayDate.toString())
        //setUsersID?
            console.log(displayDate)
            Axios.post(
              "http://localhost:3001/walks",
              {
                dog: dog,
                user: user,
                date: date
              },
              console.log("hi")
            )
            .then((res) => {
                console.log("Server response: ", res);
            })
            .catch((err) => {
                console.log("Server respondend with error: ", err);
            })
            
  };

  const history = () => {
    Axios.get('http://localhost:3001/walkHistory')
      .then((res) => {
        setWalkList(res.data)
      })
      .catch((err) => {
        console.log("Server respondend with error: ", err);
    })
  }
  console.log(walkList);
  useEffect(() => {
    componentDidMount();
    history();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[date]);

  return (
    <>
      <h1>Walks</h1>
      <div className="walks">
        <form className="walks-form">
          <h2>Add walk</h2>
          <div className="field">
            <label>Dog:</label>
            <select
              name="dog"
              
              onChange={(e) => {
                setDog(e.target.value)
              }}
            >
              {dogList.map((val, key) => (
                <option>{val.name}</option>
              ))}
            </select>
            <br />
            <label>User:</label>
            <select
              name="user"
              
              onChange={(e) => {
                setUser(e.target.value)
              }}
            >
              {userList.map((val, key) => (
                <option>{val.name}</option>
              ))}
            </select>
            <br />
            <button onClick={addWalking}>Add walk</button>
          </div>
          <div className="history">
            <h2>Walk History</h2>
            {walkList.map((val, key) => {
              return <div className="walk-card">
                <ul>
                  <li><b>Dog:</b> {val.dog} <b>User:</b> {val.walkUser} <b>Date:</b> {val.walkDate}</li>
                </ul>
                
                
                
          </div>
            
        })}
          </div>
        </form>
      </div>
    </>
  );
}

export default Walks;
