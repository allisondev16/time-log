import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import BreakTime from "./BreakTime";
import Box from '@material-ui/core/Box';
import Zoom from '@material-ui/core/Zoom';

function Time() {
    Date.prototype.addHours = function (h) {
        this.setTime(this.getTime() + (h * 60 * 60 * 1000));
        return this;
    }

    

    const [isStart, setStart] = useState(false);
    const [isBreak, setBreak] = useState(false);
    const [finalTime, setFinalTime] = useState();
    // const [breakTime, setBreakTime] = useState();


    function handleStart() {
        setStart(true);
        const time = new Date();

        const finalTime = time.addHours(10);

        const localFinalTime = finalTime.toLocaleTimeString();
        setFinalTime(localFinalTime);
    }

    function handleStartFromBreak() {
        setStart(true);
        console.log(finalTime);
    }

    function handleBreak() {
        setStart(false);
        setBreak(true);
        
    }





    return <div>

        {isStart && <Fade in={isStart}>
            <div className="time">
                <h3>Stop working by</h3>
                <h1>{finalTime}</h1>
            </div></Fade>}

        {isStart && <Zoom in={isStart}>
            <div className="stopButton">
                <Box ml={2} mr={2} mt={10}>
                    <BreakTime
                        onClick={handleBreak}
                    />
                </Box>
                <Box ml={2} mr={2} mt={10}>
                    <Button variant="contained" color="secondary" size="large">Done Working</Button>
                </Box>
            </div></Zoom>}

        <div className="startButton">
            {!isStart && <Button onClick={isBreak ? handleStartFromBreak : handleStart} variant="contained" color="primary" size="large">{isBreak ? "Resume Working" : "Start Working"}</Button>}
        </div>
    </div>
}

export default Time