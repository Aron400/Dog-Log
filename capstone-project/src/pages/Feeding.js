import React, { useState, useEffect } from "react";
import Axios from "axios";

function Feeding() {
  const [feeding, setFeeding] = useState('');
  const [feedList, setFeedList] = useState([]);
  const [dog, setDog] = useState('');
  const [user, setUser] = useState('');
  const [date, setDate] = useState('');
  const [dogList, setDogList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [usersID, setUsersID] = useState('1');
  const [dogsID, setDogsID] = useState('1');

  const componentDidMount = () => {
    console.log('testing')
    Axios.get("http://localhost:3001/users").then((res) => {
      const users = res.data;
      setUserList(users);
      setUser(users[0].name)
    });
    Axios.get("http://localhost:3001/dogs").then((res) => {
      const dogs = res.data;
      setDogList(dogs);
      setDog(dogs[0].name)
    });
    history();
  }

  const addFeeding = (e) => {
    e.preventDefault();
        if (dog ==='' || user ==='') {
            alert('field is mandatory');
            return;
        }
        let dateUnform = new Date();
        let displayDate = dateUnform.toLocaleString();
        console.log(displayDate)
        setDate(displayDate.toString())      
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
  }, []);

  useEffect(() => {
    if (date) {
      Axios.post(
        "http://localhost:3001/feeding",
        {
          dog: dog,
          dogsID: dogsID,
          user: user,
          usersID: usersID,
          date: date
        },
      )
      .then((res) => {
          console.log("Server response: ", res);
      }).then(() => {
        history();
      })
      .catch((err) => {
          console.log("Server respondend with error: ", err);
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[date]);

  return (
    <div>
      <h1>Feeding</h1>
    <div style={{ marginTop: "50px"}}>
      <table className="styled-table">
        <tr className="vaccineTitle" style={{ textAlign: "center" }}>
          Add Feeding
        </tr>
      </table>
      <table className="styled-table">
          <div className="field">
            <label><h3>Select Dog:</h3></label>
            <select
              name="dog"
              onChange={(e) => {
                setDog(e.target.value)
                setDogsID(e.target.value)
              }}
            >
              {dogList.map((val, key) => 
              (
                <option>{val.name} {val.dogsID}</option>
              ))}
            </select>
            <br />
            <label><h3>Select User:</h3></label>
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
            <button className="add" onClick={addFeeding}>Add Feeding</button>
          </div>
          </table>
          <div style={{ marginTop: "50px" }} className="history">
          <table className="styled-table">
        <tr className="vaccineTitle" style={{ textAlign: "center" }}>
          Feeding History
        </tr>
      </table>
          <table className="styled-table">
            <thead>
                <tr className="vaccineHeader">
                  <th style={{ textAlign: "center" }}>Dog Name</th>{" "}
                  <th style={{ textAlign: "center" }}>User Name</th>{" "}
                  <th style={{ textAlign: "center" }}>Feeding Date</th>{" "}
                </tr>
            </thead>
            <tbody className="white">
            {feedList.map((val, key) => {
              return (
                  <tr>
                    <td style={{ textAlign: "center" }}>{val.dog}</td>
                  <td style={{ textAlign: "center" }}>{val.feedingUser}</td>
                  <td style={{ textAlign: "center" }}>{val.feedingDate}</td>
                  </tr>
          )
          })}
          </tbody>
            </table>
          </div>
    </div>
    </div>
  );
}

export default Feeding;
