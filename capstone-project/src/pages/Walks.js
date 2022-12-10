import React, { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import AddWalk from '../components/AddWalk';
import WalkHistory from '../components/WalkHistory';
import './Walk.css'

function Walks() {
  const [walkList, setWalkList] = useState([]);

  const addWalkHandler = (walk) => {
    console.log(walk);
    setWalkList([...walkList, { id: uuid(), ...walk }]);
  };

  const removeWalkHandler = (id) => {
    const newWalkList = walkList.filter((walk) => {
      return walk.id !== id;
    });

    setWalkList(newWalkList);
  };

  return (
    <div className='walk'>
      <AddWalk addWalkHandler={addWalkHandler}/>
      <WalkHistory walkList={walkList} getWalkId={removeWalkHandler} />
    </div>
  );
}

export default Walks
