import Axios from "axios";
import React, { useState, useEffect } from "react";
import "./pages.css";

function Home() {
  const [dog, setDog] = useState("");
  const [user, setUser] = useState("");
  const [dogList, setDogList] = useState([]);
  const [userList, setUserList] = useState([]);

  const addDog = (e) => {
    e.preventDefault();
    if (dog === "") {
      alert("field is mandatory");
      return;
    }
    console.log(dog);
    Axios.post("http://localhost:3001/addDog", {
      name: dog,
    })
      .then((res) => {
        console.log("Server response: ", res);
      })
      .catch((err) => {
        console.log("Server respondend with error: ", err);
      });
    setDog("");
  };
  const addUser = (e) => {
    e.preventDefault();
    if (user === "") {
      alert("field is mandatory");
      return;
    }
    console.log(user);
    Axios.post("http://localhost:3001/addUser", {
      name: user,
    })
      .then((res) => {
        console.log("Server response: ", res);
      })
      .catch((err) => {
        console.log("Server respondend with error: ", err);
      });
    setUser("");
  };
  const getDogs = () => {
    Axios.get("http://localhost:3001/dogs")
      .then((res) => {
        console.log("Server response: ", res);
        console.log(res.data);
        setDogList(res.data);
      })
      .catch((err) => {
        console.log("Server respondend with error: ", err);
      });
  };
  const getUsers = () => {
    Axios.get("http://localhost:3001/users")
      .then((res) => {
        console.log("Server response: ", res);
        setUserList(res.data);
      })
      .catch((err) => {
        console.log("Server respondend with error: ", err);
      });
  };
  
  useEffect(() => {
    getUsers();
    getDogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dog, user, dogList, userList]);
  const removeUser = (id) => {
// true false and run useEffect
    Axios.delete(`http://localhost:3001/deleteUser/${id}`);

  };
  const removeDog = (id) => {
    Axios.delete(`http://localhost:3001/deleteDog/${id}`);
  };
  
  return (
    <div>
      <h1>Home</h1>
      <table className="styled-table" style={{ marginTop: "50px" }}>
            <tr className="vaccineTitle" style={{ textAlign: "center" }}>
              Add
            </tr>
           </table>
      <table className="styled-table" ></table>
      <div>
        <div className="addDogUser">
          <h3 style={{ paddingTop: "8px" }}>Add Dog</h3>
          <div className="inputPadding">
            <input
              type="text"
              name="new-dog"
              placeholder="enter your dog name here ..."
              className="addDogInput"
              onChange={(e) => {
                setDog(e.target.value);
              }}
              value={dog}
            />
            <button className="addButton" onClick={addDog}>
              Add
            </button>
          </div>

          <h3>Add User</h3>
          <div className="inputPadding">
            <input
              className="newUser"
              placeholder="enter a username here ..."
              type="text"
              name="new-user"
              onChange={(e) => {
                setUser(e.target.value);
              }}
              value={user}
            />
          <button className="addButton" onClick={addUser}>
            Add
          </button>
          </div>
        </div>
      </div>
      <table className="styled-table" style={{ marginTop: "50px" }}>
            <tr className="vaccineTitle" style={{ textAlign: "center" }}>
              Dogs Information
            </tr>
           </table>
      <table className="styled-table" >
        <thead>
          <tr className="vaccineHeader">
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Last Feeding User</th>
            <th style={{ textAlign: "center" }}>Last Feeding Date</th>
            <th style={{ textAlign: "center" }}>Last Walk User</th>
            <th style={{ textAlign: "center" }}>Last Walk Date</th>
            <th style={{ textAlign: "center" }}>Remove</th>
          </tr>
        </thead>
        <tbody className="white">
          {dogList.map((val, key) => {
            return (
              <tr >
                <td style={{ textAlign: "center" }}>{val.name}</td>
                <td style={{ textAlign: "center" }}>{val.feedingUser}</td>
                <td style={{ textAlign: "center" }}>{val.feedingDate}</td>
                <td style={{ textAlign: "center" }}>{val.walkUser}</td>
                <td style={{ textAlign: "center" }}>{val.walkDate}</td>
                <td style={{ textAlign: "center" }}>
                  <button
                    onClick={() => {
                      removeDog(val.dogsID);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div >
        <div>
          
        <table className="styled-table" style={{ marginTop: "50px" }}>
            <tr className="vaccineTitle" style={{ textAlign: "center" }}>
              Users Information
            </tr>
           </table>
           <table className="styled-table" >
            <thead>
              <tr className="vaccineHeader">
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>Remove</th>
              </tr>
            </thead>
            <tbody className="white">
              {userList.map((val, key) => {
                return (
                  <tr>
                    <td style={{ textAlign: "center" }}>{val.name}</td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        onClick={() => {
                          removeUser(val.usersID);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
