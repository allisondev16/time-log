import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Zoom from '@material-ui/core/Zoom';
import TimeBox from './TimeBox';
import axios from "axios";

function Time() {

    const [isStart, setStart] = useState(false);
    const [finalTime, setFinalTime] = useState();
    const [newFinalTime, setNewFinalTime] = useState();

    const [isBreak, setBreak] = useState(false);
    const [breakTime, setBreakTime] = useState();

    const [isDone, setDone] = useState(false);
    const [overtime, setOvertime] = useState(0);
    const [outstandingOvertime, setOutstandingOvertime] = useState(0);


    // Outstanding break time
    const [breakDuration, setBreakDuration] = useState(0);

    // Allocated Break Time in minutes:
    let allocatedBreakTime = 175;
    const [remainingBreakTime, setRemainingBreakTime] = useState();

    //get request
    useEffect(() => {
        async function fetchData() {
            const req = await axios.get("/time-log/data");
            console.log(`req:${req}`);

            //find the collection for today
            const sessionToday = req.data.find(session => session.day === new Date().toDateString());

            if (sessionToday) {
                setFinalTime(new Date(sessionToday.finalTime));
                setNewFinalTime(new Date(sessionToday.finalTime));
                setBreakTime(new Date(sessionToday.breakTime));
                setBreakDuration(sessionToday.breakDuration);
                setOvertime(sessionToday.overtime);
                setStart(sessionToday.isStart);
                setBreak(sessionToday.isBreak);
                setDone(sessionToday.isDone);
                console.log(sessionToday);
                req.data.map(day => setOutstandingOvertime(prevValue => {return prevValue + day.overtime}));
            } else {
                axios.post("/time-log/data", {
                    day: new Date().toDateString(),
                    breakDuration: 0,
                    overtime: 0
                })
                    .then(function (response) {
                        console.log(response);
                    })
            }
        }
        console.log("Get request");
        fetchData();
    }, []);

    function handleStart() {
        setStart(true);
        // let time = new Date();
        // let finalTime = new Date().addHours(10);

        let finalTime = new Date(new Date().getTime() + 10 * 60 * 60 * 1000);
        setFinalTime(finalTime);
        setNewFinalTime(finalTime);

        //patch request
        axios.patch("/time-log/data", {
            finalTime: finalTime,
            isStart: true,
        })
            .then(function (response) {
                console.log(response);
            })

    }

    function handleBreak() {
        setStart(false);
        setBreak(true);
        let breakTime = new Date();
        setBreakTime(breakTime);

        //patch request
        axios.patch("/time-log/data", {
            breakTime: breakTime,
            isStart: false,
            isBreak: true,
        })
            .then(function (response) {
                console.log(response);
            })
    }

    function handleStartFromBreak() {
        setStart(true);
        //setDone(false);

        let resumeTime = new Date();

        let currentBreakDuration = resumeTime - breakTime;
        setBreakDuration((prevValue) => {
            return prevValue + currentBreakDuration;
        });
        //patch request
        axios.patch("/time-log/data", {
            breakDuration: breakDuration + currentBreakDuration,
            isStart: true,
        })
            .then(function (response) {
                console.log(response);
            })
    }

    // used Effect Hook to use the updated value of breakDuration (Reference: https://reactjs.org/docs/hooks-effect.html)
    // used a dependency to avoid looping (Reference: https://dmitripavlutin.com/react-useeffect-infinite-loop/)
    useEffect(() => {
        let currentRemainingBreakTime = allocatedBreakTime * 60 * 1000 - breakDuration;
        setRemainingBreakTime(currentRemainingBreakTime);
        console.log(currentRemainingBreakTime);
        if (currentRemainingBreakTime < 0) {
            let newFinalTime = new Date(finalTime.getTime() - currentRemainingBreakTime);
            setNewFinalTime(newFinalTime);
            //patch request
            axios.patch("/time-log/data", {
                finalTime: newFinalTime,
            })
                .then(function (response) {
                    console.log(response);
                })
        }
    }, [breakDuration, allocatedBreakTime, finalTime]);

    function handleDoneWorking() {
        setStart(false);

        let doneWorkingTime = new Date();
        console.log("Done Working time: " + doneWorkingTime);

        // final time - done working time
        let overtime = doneWorkingTime - finalTime + remainingBreakTime;
        setOvertime(overtime);
        console.log("Overtime in hours: " + overtime / 1000 / 60 / 60);



        // render the result
        setDone(true);

        //patch request
        axios.patch("/time-log/data", {
            overtime: overtime,
            isStart: false,
            isDone: true
        })
            .then(function (response) {
                console.log(response);
                setOutstandingOvertime(prevValue => { return prevValue + overtime });
            })
    }

    return <div>

        {isStart &&
            <TimeBox
                isStart={isStart}
                title={"Stop working by"}
                time={`${newFinalTime.toLocaleTimeString()}`}
            />
        }

        {isStart && <Zoom in={isStart}>

            <div className="stopButton">
                <Box ml={2} mr={2} mt={8} mb={6}>
                    <Button onClick={handleBreak} variant="outlined" color="secondary" size="large">Take a Break</Button>
                </Box>

                <Box ml={2} mr={2} mt={8} mb={6}>
                    <Button onClick={() => { handleDoneWorking(overtime) }} variant="contained" color="secondary" size="large">Done Working</Button>
                </Box>

            </div></Zoom>}


        {isStart && <Fade in={isStart}>
            <div className="time">
                <h4>Remaining Break Time: {(remainingBreakTime / 60 / 1000).toFixed(2) + " minutes"}</h4>
            </div></Fade>}

        {isDone && <div>
            <TimeBox
                isStart={isDone}
                title={"Overtime"}
                time={(overtime / 1000 / 60 / 60).toFixed(2) + " hours"}
            />
            <br />
            <br />
            <div className="time">
                <h4>Outstanding overtime: {
                    (outstandingOvertime / 1000 / 60 / 60).toFixed(2) + " hours"
                }</h4>
            </div></div>
        }

        <div className="startButton">
            {!isStart &&
                <Fade in={!isDone}>
                    <Button onClick={isBreak ? handleStartFromBreak : handleStart} variant="contained" color="primary" size="large">{isBreak ? "Resume Working" : "Start Working"}</Button>
                </Fade>}

        </div>
    </div>
}

export default Time