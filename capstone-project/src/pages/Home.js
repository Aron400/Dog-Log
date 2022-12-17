import  Axios from "axios";
import React, {useState, useEffect} from "react";
import "./pages.css";

function Home() {
  const [dog, setDog] = useState('');
  const [user, setUser] = useState('');
  const [dogList, setDogList] = useState([]);
  const [userList, setUserList] = useState([]);

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
              })
              .then((res) => {
                  console.log("Server response: ", res);
              })
              .catch((err) => {
                console.log("Server respondend with error: ", err);
              })
            setUser('');
  }
  const getDogs = () => {
    Axios.get('http://localhost:3001/dogs')
      .then((res) => {
          console.log("Server response: ", res);
          setDogList(res.data)
      })
      .catch((err) => {
          console.log("Server respondend with error: ", err);
      })
  }
  const getUsers = () => {
    Axios.get('http://localhost:3001/users')
      .then((res) => {
          console.log("Server response: ", res);
          setUserList(res.data)
      })
      .catch((err) => {
          console.log("Server respondend with error: ", err);
      })
  }
  useEffect(() => {
    getUsers();
    getDogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[addDog, addUser]);
  const removeUser = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`)
  }
  const removeDog = () => {

  }

  return (
    <div className="home">
      <h1>Home</h1>
      <h3>Add Dog</h3>
        <form>
          <input 
            type='text'
            name='new-dog'
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
            onChange={(e) => {
              setUser(e.target.value)
            }}
          />
          <button onClick={addUser}>Add</button>
        </form>

      <div className="users">
        <h3>Users</h3>
        
        {userList.map((val, key) => {
          return <div className="user-card">
            <h4>{val.name}</h4>
            <button onClick={() => {removeUser(val.usersID)}}>remove</button>
            </div>
        })}
      </div>
      <div className="dogs">
        <h3>Dogs</h3>
        
        {dogList.map((val, key) => {
          return <div className="dog-card">
            <h4>{val.name}</h4>
            <div>lastFeeding: user: {val.feedingUser}, date: {val.feedingDate}</div>
            <div>lastWalk: user: {val.walkUser} - date: {val.walkDate}</div>
            <div>lastMed</div>
            <button>remove</button>
            </div>
            
        })}
      </div>
    </div>
  );
}

export default Home;