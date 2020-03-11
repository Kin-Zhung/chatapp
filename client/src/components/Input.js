import React from 'react';

import '../style.css';
const Input = ({message,setMessage,sendMessage}) =>(
    <form className="form">
        <input className="input" type="text" placeholder="Enter message" value={message} onChange={(event) => setMessage(event.target.value)} onKeyPress={event => event.key === 'Enter'? sendMessage(event):null}></input>
        <button className="sendButton" onClick={(event) => sendMessage(event)}>send</button>
    </form>
)

export default Input;