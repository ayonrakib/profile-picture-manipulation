import React, {useEffect, useState} from "react";
import { Button } from "react-bootstrap";

export default function Count(){
    console.log("Count component rendered!")
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount((count) => count+1)
    }, [])
    function increaseCount(){
        setCount((count) => count+1 )
    }
    // console.log("number value before rendering: ",number)
    return(
        <>
            {count}
            <br></br>
            <Button onClick={increaseCount}>
                Increase count
            </Button>
        </>

    )
}