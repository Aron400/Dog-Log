import React from 'react'
import Walks from '../pages/Walks'
import WalkCard from './WalkCard'

function WalkHistory(props) {
console.log(props)

    const deleteWalkHandler = (id) => {
        props.getWalkId(id);
    }
    const renderWalk = props.walkList.map((walk) => {
        return (
            <WalkCard walk={walk} 
            clickHandler={deleteWalkHandler}
            key={walk.id}
            />
        )
    })
  
    return (
    <div>
        <h2>Walk History</h2>
        <div>{renderWalk}</div>
    </div>
  )
}

export default WalkHistory
