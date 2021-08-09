import React from "react";
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

function TimeBox(props) {
    return <Fade in={props.isStart}>
        <div className="timeBorder">
            <h3>{props.title}</h3>
            <h1>{props.time}</h1>
        </div></Fade>
}

export default TimeBox;