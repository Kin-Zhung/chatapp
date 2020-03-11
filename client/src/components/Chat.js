import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from './InfoBar'
import Input from './Input'
import ChatLog from './ChatLog.js'

import '../style.css';
let socket; 

const Chat = ({location}) =>{
    
    const[name,setName] = useState('');
    const[room,setRoom] = useState('');
    const[message,setMessage] = useState('');
    const[messagelog,setMessagelog] = useState([]);
    const ENDPOINT ='localhost:5000'
    useEffect(()=>{
        const {name,room} = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setName(name);
        setRoom(room);
        
        socket.emit('join', {name,room},()=>{

        });

        return ()=>{
            socket.emit('disconnect');
            socket.off();
        }

    },[ENDPOINT,location.search]);

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessagelog([...messagelog, message]);
        })
    },[messagelog]);
    
    const sendMessage = (event) =>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage', message, ()=> setMessage(''));
        }
    }

    console.log(message, messagelog)
    return(
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <ChatLog messageLog={messagelog} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                
            </div>
        </div>
        /*
        <div className="outerContainer">
            <div className="container">
                <input value={message} onChange={(event) => setMessage(event.target.value)} onKeyPress={event => event.key === 'Enter'? sendMessage(event):null}/>
            </div>
        </div>
        */
    )
}

export default Chat;