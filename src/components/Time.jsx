import React from "react";
import Button from '@material-ui/core/Button';

function Time(){

    

    Date.prototype.addHours = function(h) {
        this.setTime(this.getTime() + (h*60*60*1000));
        return this;
    }

    const time = new Date();
    
    const finalTime = time.addHours(10);

    return <div className="time">
        <h3>Stop working by</h3>
        <h1>{finalTime.toLocaleTimeString()}</h1>
        <Button variant="contained" color="primary" size="large">Start Working</Button>
    </div>
}

export default Time