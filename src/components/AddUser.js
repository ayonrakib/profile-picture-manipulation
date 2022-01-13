import React from "react";
import  {useState}  from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
export default function AddUser(){
    // useEffect(() => {
    //     console.log("This log will load only 1 time when DOM is rendered!")
    // })
    console.log("came in AddUser component")
    const [userId, setUserId] = useState(0);
    function addUser(){
        axios({
            method: "GET",
            data: "",
            url: "http://localhost:9000/add-user"
        }).then(response => {
                console.log("user id from the newly created user found in the axios method is: ",response.data._id)
                // userId = response.data._id;
                setUserId(response.data._id)
            }
        )
        
    }
    console.log("user id right before return is: ",userId)

    return (
        <div>
            This is the home page
            <br></br>
            {/* <AddUser/> */}
            <Button onClick={addUser}>
                Add user
            </Button>
        </div>
    )
}