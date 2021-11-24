import React, { useState } from 'react'
import {Button, Form, Image, Modal} from 'react-bootstrap'
import axios from 'axios';

export default function Login(){
    const [profilePic, setProfilePic] = useState([])
    const [profilePicURL, setProfilePicURL] = useState("");
    const [profilePictureShown, setProfilePictureShown] = useState(false)
    const [show, setShow] = useState(false);
    const [profilePicText, setProfilePicText] = useState("");

    const handleClose = () => setShow(false);

    function setProfilePicture(e){
        e.preventDefault();
        console.log("entered handle profile picture method!")
        console.log("the pic file is: ",e.target.files[0])
        setProfilePic(e.target.files[0])
        console.log("profile pic state in setProfilePicture method is: ",profilePic)
    }

    function saveProfilePicture(e){
        e.preventDefault();
        console.log("profile pic state in saveProfilePicture method is: ",profilePic)
        console.log("came in saveProfilePicture")
        var formData = new FormData();
        formData.append("profilePic", profilePic);
        formData.append("session", "456")
        axios({
            method: 'POST',
            headers:{
                'Content-Type': 'multipart/form-data'
            },
            url: "http://localhost:4000/save-profile-picture",
            data: formData
        }).then(response => {
            console.log("response from backend is: ",response.data.data)
            setProfilePicURL(response.data.profilePictureData);
            if(profilePicURL !== ""){
                console.log("profile pic url is: ",profilePicURL)
            }
            
        })
    }

    function showProfilePicture(e){
        e.preventDefault();
        setShow(true);
        console.log("show profile pic button clicked")
        axios({
            method: "GET",
            url: profilePicURL,
            data: ""
        }).then(response => {
            console.log("response from show profile pic is: ",response)
            setProfilePicText(JSON.parse(response.data) )
            console.log("profile pic text is: ",profilePicText)
            setProfilePictureShown(true)
            window.location.href = `http://localhost:4000/`
        })
    }
    return (
        <div>

            <div>
            <Form>
                <Form.Group controlId="formFile" className="mb-3" onChange = {(e) => setProfilePicture(e)}>
                    <Form.Label>Default file input example</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                <Button variant = "primary" onClick = {(e) => saveProfilePicture(e)}>
                    Upload Picture
                </Button>
            </Form>

            </div>
            <div>
                <br></br>
            </div>

            
            {/* <Image src= "https://media.geeksforgeeks.org/wp-content/uploads/20210425000233/test-300x297.png" roundedCircle/> */}
            {profilePicURL}
        </div>
    )
}