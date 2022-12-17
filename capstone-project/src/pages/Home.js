import Axios from "axios";
import React, { useState, useEffect } from "react";

function Home() {
  const [dog, setDog] = useState("");
  const [user, setUser] = useState("");
  const [dogList, setDogList] = useState([]);
  const [userList, setUserList] = useState([]);

  // const [lastFeeding, setLastFeed] = useState([]);
  // const [lastWalk, setLastWalk] = useState([]);
  // const [lastVet, setLastVet] = useState([]);
  // useEffect(() => {
  //   findLastFeed
  // }, []);
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
  const getDogs = (e) => {
    e.preventDefault();
    Axios.get("http://localhost:3001/dogs")
      .then((res) => {
        console.log("Server response: ", res);
        setDogList(res.data);
      })
      .catch((err) => {
        console.log("Server respondend with error: ", err);
      });
  };
  const getUsers = (e) => {
    e.preventDefault();
    Axios.get("http://localhost:3001/users")
      .then((res) => {
        console.log("Server response: ", res);
        setUserList(res.data);
      })
      .catch((err) => {
        console.log("Server respondend with error: ", err);
      });
  };

  return (
    <div>
      <h1>Home</h1>
      <h3>Add Dog</h3>
      <form>
        <input
          type="text"
          name="new-dog"
          onChange={(e) => {
            setDog(e.target.value);
          }}
        />
        <button onClick={addDog}>Add</button>
      </form>
      <h3>Add User</h3>
      <form>
        <input
          type="text"
          name="new-user"
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
        <button onClick={addUser}>Add</button>
      </form>

      <div className="users">
        <button onClick={getUsers}>Show Users</button>

        {userList.map((val, key) => {
          return <div className="user">{val.name}</div>;
        })}
      </div>
      <div className="dogs">
        <button onClick={getDogs}>Show Dogs</button>

        {dogList.map((val, key) => {
          return <div>{val.name}</div>;
        })}
      </div>
    </div>
  );
}

export default Home;
