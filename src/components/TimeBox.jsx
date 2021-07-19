import React from "react";
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

function TimeBox(props) {
    return <Fade in={props.isStart}><Paper elevation={3} style={{ width: "300px", margin: "80px auto 0 auto", padding: "20px" }}>
        <div className="time">
            <h3>{props.title}</h3>
            <h1>{props.time}</h1>
        </div></Paper></Fade>
}

export default TimeBox;