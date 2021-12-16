import React, { useState } from 'react'
import {Button, Image, Form, Modal} from 'react-bootstrap'
import axios from 'axios';

export default function Login(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [profilePic, setProfilePic] = useState([])
    const [profilePicURL, setProfilePicURL] = useState("");
    // const [profilePictureShown, setProfilePictureShown] = useState(false)

    // const [profilePicText, setProfilePicText] = useState("");
    // const [modalText, setModalText] = useState("");
    var modalPicture = <Image src = {profilePicURL}></Image>

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
            
        })
    }

    // function showProfilePicture(e){
    //     e.preventDefault();
    //     setShow(true);
    //     console.log("show profile pic button clicked")
    //     axios({
    //         method: "GET",
    //         url: profilePicURL,
    //         data: ""
    //     }).then(response => {
    //         console.log("response from show profile pic is: ",response)
    //         setProfilePicText(JSON.parse(response.data) )
    //         console.log("profile pic text is: ",profilePicText)
    //         setProfilePictureShown(true)
    //         window.location.href = `http://localhost:4000/`
    //     })
    // }
    function showModalProfilePicture(){
        axios({
            method: 'GET',
            url: "http://localhost:4000/show-modal-text",
            data: ""
        }).then(response => {
            console.log("response in show modal text is: ",response.data.data)
            setProfilePicURL(response.data.data)
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

            <>
                <Button variant="primary" onClick={() => {handleShow(); showModalProfilePicture();} }>
                    Launch demo modal
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className = "modalprofilePicture">{modalPicture}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
            {/* <Image src= "https://media.geeksforgeeks.org/wp-content/uploads/20210425000233/test-300x297.png" roundedCircle/> */}
            <Image src = "http://localhost:4000/images/456.png"/>
            
        </div>
    )
}