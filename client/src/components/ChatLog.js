import React from 'react';
import MessageLine from './MessageLine'
import ScrollToBottom from 'react-scroll-to-bottom'

import '../style.css';

const ChatLog = ({messageLog, name}) =>(
    <ScrollToBottom>
        {messageLog.map((message,i) => <div key={i}><MessageLine message={message} name={name}/></div>)}
    </ScrollToBottom>
)

export default ChatLog;