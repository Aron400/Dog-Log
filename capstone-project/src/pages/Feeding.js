import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import AddFeeding from "../components/AddFeeding";
import FeedingHistory from "../components/FeedingHistory";
import "./Feeding.css";

function Feeding() {
  const [feedList, setFeedList] = useState([]);

  const addFeedingHandler = (feed) => {
    console.log(feed);
    if (feedList.length >= 10) {
    } else {
      setFeedList([...feedList, { id: uuid(), ...feed }]);
    }
  };
  console.log(feedList);

  const removeFeedingHandler = (id) => {
    const newFeedList = feedList.filter((feed) => {
      return feed.id !== id;
    });

    setFeedList(newFeedList);
  };

  return (
    <>
      <h1>Feeding</h1>
      <div className="feeding">
        <div className="addFeeding">
          <AddFeeding addFeedingHandler={addFeedingHandler} />
        </div>
        <div className="feedingHistory">
          <FeedingHistory
            feedList={feedList}
            getFeedId={removeFeedingHandler}
          />
        </div>
      </div>
    </>
  );
}

export default Feeding;
