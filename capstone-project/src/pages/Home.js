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
  }, [dog, user]);
  const removeUser = (id) => {
    Axios.delete(`http://localhost:3001/deleteUser/${id}`);
  };
  const removeDog = (id) => {
    Axios.delete(`http://localhost:3001/deleteDog/${id}`);
  };

  return (
    <div>
      <h1>Home</h1>
      <div style={{ marginTop: "50px" }}>
        <div className="addDogUser">
          <h3>Add Dog</h3>
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
            </button>{" "}
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
          </div>
          <button className="addButton" onClick={addUser}>
            Add
          </button>
        </div>
      </div>
      <table className="dogs" style={{ marginTop: "50px" }}>
        <thead>
          <tr>
            {" "}
            <th style={{ textAlign: "center" }}>Name</th>{" "}
            <th style={{ textAlign: "center" }}>Last Feeding</th>{" "}
            <th style={{ textAlign: "center" }}>Last Walk</th>{" "}
          </tr>
        </thead>
        <tbody>
          {dogList.map((val, key) => {
            return (
              <tr>
                <td>{val.name}</td>
                <td>{val.feedingUser}</td>
                <td>{val.feedingDate}</td>
                <td>
                  <button
                    onClick={() => {
                      removeDog(val.dogsID);
                    }}
                  >
                    remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="users" style={{ marginTop: "50px" }}>
        <div>
          <h3>Users</h3>
          {userList.map((val, key) => {
            return (
              <div className="user-card">
                <h4>{val.name}</h4>
                <button
                  onClick={() => {
                    removeUser(val.usersID);
                  }}
                >
                  remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
