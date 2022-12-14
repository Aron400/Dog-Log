import React from "react";

function Home() {
  
  const findLastFeed = () => {
    //get most recent Feeding from database
  }
  const findLastWalk = () => {
    //get most recent Walk from database
  }
  const findLastVet = () => {
    //get most recent Vet visit from database
  }

  // const [user, setUser] = useState([]);
  // console
  
  // Axios.post('http://localhost:3001/addUser', {
  //               user: user
  //           },
  //           console.log('hi')
  //           )
  return (
    <div className='home'>
      <h1>Home</h1>
      <h3>Last Feeding</h3>
        <div>{findLastFeed}</div>
      <h3>Last Walk</h3>
        <div>{findLastWalk}</div>
      <h3>Last Vet Visit</h3>
        <div>{findLastVet}</div>
      <h3>Add Dog</h3>
        <form>
          <input 
            type='text'
            name='new-dog'
            // value={}
            // onChange={}
          />
          <button>Add</button>
        </form>
      <h3>Add User</h3>
        <form>
          <input 
            type='text'
            name='new-user'
            // value={}
            // onChange={}
          />
          <button>Add</button>
        </form>
    </div>
  );
}

export default Home;
