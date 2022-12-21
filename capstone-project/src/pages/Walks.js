import React, { useState, useEffect } from "react";
import Axios from "axios";

function Walks() {
  
  const [walk, setWalk] = useState('');
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
      setUser(users[0].name)
    });
    Axios.get("http://localhost:3001/dogs").then((res) => {
      const dogs = res.data;
      setDogList(dogs);
      setDog(dogs[0].name)
    });
    history();
  }

  const addWalk = (e) => {
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
  }, []);

  useEffect(() => {
    if (date) {
      Axios.post(
        "http://localhost:3001/walks",
        {
          dog: dog,
          user: user,
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
      <h1>Walks</h1>
    <div style={{ marginTop: "50px"}}>
      <table className="styled-table">
        <tr className="vaccineTitle" style={{ textAlign: "center" }}>
          Add Walk
        </tr>
      </table>
      <table className="styled-table">
          <div className="field">
            <label>Select Dog:</label>
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
            <label>Select User:</label>
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
            <button classname="add" onClick={addWalk}>Add Walks</button>
          </div>
          </table>
          <div style={{ marginTop: "50px" }} className="history">
          <table className="styled-table">
        <tr className="vaccineTitle" style={{ textAlign: "center" }}>
          Walk History
        </tr>
      </table>
          <table className="styled-table">
            <thead>
                <tr className="vaccineHeader">
                  <th style={{ textAlign: "center" }}>Dog Name</th>{" "}
                  <th style={{ textAlign: "center" }}>User Name</th>{" "}
                  <th style={{ textAlign: "center" }}>Walk Date</th>{" "}
                </tr>
            </thead>
            <tbody>
            {walkList.map((val, key) => {
              return (
                  <tr>
                    <td style={{ textAlign: "center" }}>{val.dog}</td>
                  <td style={{ textAlign: "center" }}>{val.walkUser}</td>
                  <td style={{ textAlign: "center" }}>{val.walkDate}</td>
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

export default Walks;
