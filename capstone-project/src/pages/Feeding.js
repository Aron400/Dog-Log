import React, { useState, useEffect } from "react";
import Axios from "axios";
import { v4 as uuid } from "uuid";
import AddFeeding from "../components/AddFeeding";
import FeedingHistory from "../components/FeedingHistory";
import "./pages.css";

function Feeding() {
  const [feeding, setFeeding] = useState('');
  const [feedList, setFeedList] = useState([]);
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

  const addFeeding = (e) => {
    e.preventDefault();
        if (dog ==='' || user ==='') {
            alert('field is mandatory');
            return;
        }
        let date = new Date();
        let displayDate = date.toLocaleString();
        console.log(displayDate)
        setDate(displayDate.toString())
            console.log(date)
            Axios.post(
              "http://localhost:3001/feeding",
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
    Axios.get('http://localhost:3001/feedingHistory')
      .then((res) => {
        setFeedList(res.data)
      })
      .catch((err) => {
        console.log("Server respondend with error: ", err);
    })
  }
  console.log(feedList);
  useEffect(() => {
    componentDidMount();
    history();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <>
      <h1>Feeding</h1>
      <div className="feeding">
        <form className="feeding-form">
          <h2>Add Feeding</h2>
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
            <button onClick={addFeeding}>Add Feeding</button>
          </div>
          <div className="history">
            <form>
            <h2>Feeding History</h2>
            {feedList.map((val, key) => {
              return <div className="feed-card">
                <ul>
                  <li><b>Dog:</b> {val.dog} <b>User:</b> {val.feedingUser} <b>Date:</b> {val.feedingDate}</li>
                </ul>
                
          </div>
            
        })}
            </form>
          </div>
        </form>
      </div>
    </>
  );
}

export default Feeding;
