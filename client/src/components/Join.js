import React,{useState} from 'react'
import {Link} from 'react-router-dom'

import '../style.css';
const Join = () =>{
    const[name,setName] = useState('');
    const[room,setRoom] = useState('');

    return(
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <div><input placeholder ="Username" className="joinInput" type="text" onChange={(event)=>setName(event.target.value)}></input></div>
                <div><input placeholder ="Room name" className="joinInput" type="text" onChange={(event)=>setRoom(event.target.value)}></input></div>
                <Link onClick={event =>(!name || !room) ? event.preventDefault():null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button" type="submit">sign in</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;