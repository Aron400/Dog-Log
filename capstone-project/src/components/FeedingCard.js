import React from 'react'
import * as FaIcons from 'react-icons/fa';

function FeedingCard(props) {
  
    const { id, dog, user, date } = props.feed;
    return (
    <div>
        <div className='item'>
            <div className='content'>
                <div>Dog: {dog}</div>
                <div>User: {user}</div>
                <div>Date: {date}</div>
            </div>
        </div>
        <FaIcons.FaRegTrashAlt
        style={{ color: "red", marginTop: "7px" }}
        onClick={() => props.clickHandler(id)} 
        />
    </div>
  )
}

export default FeedingCard
