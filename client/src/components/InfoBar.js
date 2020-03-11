import React from 'react';

import '../style.css';
const InfoBar = ({room}) =>(
    <div className="infoBar">
        <div className="leftInnderContainer">
            <h1>{room}</h1>
        </div>
        <div className="rightInnderContainer">
            <a href="/">close</a>
        </div>

    </div>
)

export default InfoBar;