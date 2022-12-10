import React from 'react'
import Feeding from '../pages/Feeding'
import FeedingCard from './FeedingCard'

function FeedingHistory(props) {
console.log(props)

    const deleteFeedHandler = (id) => {
        props.getFeedId(id);
    }
    const renderFeeding = props.feedList.map((feed) => {
        return (
            <FeedingCard feed={feed} 
            clickHandler={deleteFeedHandler}
            key={feed.id}
            />
        )
    })
  
    return (
    <div>
        <h2>Feeding History</h2>
        <div>{renderFeeding}</div>
    </div>
  )
}

export default FeedingHistory
