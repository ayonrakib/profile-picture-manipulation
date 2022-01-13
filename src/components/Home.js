import { Button } from "react-bootstrap";
import React from "react";
import { useState } from 'react';
import axios from "axios";
export default function Home(){
    console.log("came in AddUser component")
    const [userId, setUserId] = useState(0);
    var inputReference = React.createRef();
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


    function deleteUser(){
        console.log("came in delete user method!")
        console.log("id of the text input is: ",inputReference.current.id)
        console.log("value of the text input is: ",inputReference.current.value)
        axios({
            method: "POST",
            url: "http://localhost:9000/delete-user",
            data: {
                id:inputReference.current.value
            }
        }).then(response => {
            console.log("response from the delete user url is: ",response.data)
        })
    }
    return (
        <div>
            This is the home page
            <br></br>
            <Button onClick={addUser}>
                Add user
            </Button>
            <br></br>
            <input type="text" value={userId} id="userIdToDelete" ref={inputReference}></input>
            <Button onClick={deleteUser}>
                Delete user
            </Button>
        </div>
    )
}