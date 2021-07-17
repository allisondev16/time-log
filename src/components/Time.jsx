import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Zoom from '@material-ui/core/Zoom';

function Time() {
    Date.prototype.addHours = function (h) {
        this.setTime(this.getTime() + (h * 60 * 60 * 1000));
        return this;
    }



    const [isStart, setStart] = useState(false);
    const [finalTime, setFinalTime] = useState();

    const [isBreak, setBreak] = useState(false);
    const [breakTime, setBreakTime] = useState();

    const [resumeTime, setResumeTime] = useState();

    const [doneWorkingTime, setDoneWorkingTime] = useState();

    const [isDone, setDone] = useState(false);
    const [overtime, setOvertime] = useState();

    const [breakDuration, setBreakDuration] = useState(0);

    // Allocated Break Time:
    let allocatedBreakTime = 135;
    const [remainingBreakTime, setRemainingBreakTime] = useState();
    

    function handleStart() {
        setStart(true);
        // let time = new Date();
        let finalTime = new Date().addHours(10);
        setFinalTime(finalTime);
    }

    function handleBreak() {
        setStart(false);
        setBreak(true);
        let breakTime = new Date();
        setBreakTime(breakTime);

    }

    function handleStartFromBreak() {
        setStart(true);
        setDone(false);

        let resumeTime = new Date();
        setResumeTime(resumeTime);

        let currentBreakDuration = resumeTime - breakTime;
        setBreakDuration((prevValue)=>{
            return prevValue+currentBreakDuration;
        });
        console.log("Break duration in seconds: " + breakDuration/1000);

        let newFinalTime = new Date(finalTime.getTime() + breakDuration);
        console.log("New Final Time :" + newFinalTime);
        setFinalTime(newFinalTime);
    }

    // used Effect Hook to use the updated value of breakDuration (Reference: https://reactjs.org/docs/hooks-effect.html)
    useEffect(()=>{
        let currentRemainingBreakTime = allocatedBreakTime * 60 * 1000 - breakDuration;
        setRemainingBreakTime(currentRemainingBreakTime);
        
    });


    function handleDoneWorking() {
        setStart(false);

        let doneWorkingTime = new Date();
        setDoneWorkingTime(doneWorkingTime);
        console.log("Done Working time: " + doneWorkingTime);

        // final time - done working time
        let overtime = doneWorkingTime - finalTime;
        setOvertime(overtime);
        console.log("Overtime in hours: " + overtime / 1000 / 60 / 60);

        // render the result
        setDone(true);
    }

    return <div>

        {isStart && <Fade in={isStart}>
            <div className="time">
                <h3>Stop working by</h3>
                <h1>{finalTime.toLocaleTimeString()}</h1>
            </div></Fade>}


        {isStart && <Zoom in={isStart}>
            <div className="stopButton">
                <Box ml={2} mr={2} mt={10}>
                    <Button onClick={handleBreak} variant="outlined" color="secondary" size="large">Take a Break</Button>
                </Box>

                <Box ml={2} mr={2} mt={10}>
                    <Button onClick={handleDoneWorking} variant="contained" color="secondary" size="large">Done Working</Button>
                </Box>

            </div></Zoom>}

        {isStart && <Fade in={isStart}>
            <div className="time">
                <h4>Remaining Break Time: {(remainingBreakTime/60/1000).toFixed(2) + " minutes"}</h4>
            </div></Fade>}


        {isDone && <Fade in={isDone}>
            <div className="time">
                <h3>Overtime</h3>
                <h1>{(overtime / 1000 / 60 / 60).toFixed(2) + " hours"}</h1>
            </div></Fade>}

        <div className="startButton">
            {!isStart &&
                <Fade in={!isDone}>
                    <Button onClick={isBreak ? handleStartFromBreak : handleStart} variant="contained" color="primary" size="large">{isBreak ? "Resume Working" : "Start Working"}</Button>
                </Fade>}

        </div>
    </div>
}

export default Time