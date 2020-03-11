import React from 'react';


import '../style.css';

const MessageLine = ({message:{user , text},name}) =>{
  return(
      <div className="messageContainer">
        <h5>{user}</h5>
        <p>{text}</p>
      </div>
  )
}


export default MessageLine;