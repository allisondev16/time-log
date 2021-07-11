import React from "react";
import Button from '@material-ui/core/Button';

function BreakTime(props){

    


    return <Button onClick={props.onClick} variant="outlined" color="secondary" size="large">Take a Break</Button>
}

export default BreakTime;