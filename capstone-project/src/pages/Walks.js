import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import AddWalk from "../components/AddWalk";
import WalkHistory from "../components/WalkHistory";
import "./pages.css";
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
    <div className="walks">
      <h1>Walk</h1>
      <div className="addWalk">
        <AddWalk addWalkHandler={addWalkHandler} />
      </div>
      <div className="walkHistory">
        <WalkHistory walkList={walkList} getWalkId={removeWalkHandler} />
      </div>
    </div>
  );
}

export default Walks;
