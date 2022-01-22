import React, { useState } from "react";
import axios from "axios";
export default function CallAxiosMultipleTimes(){
    console.log("CallAxiosMultipleTimes component rendered!")
    const [weatherText, setWeatherText] = useState("");
    const [weatherIcon, setWeatherIcon] = useState("");
    axios({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=Austin&appid=1b6a9c43f4c7125af9f430ff79f20599",
        data: ""
    }).then(response => {
        if(weatherText === ""){
            setWeatherText(response.data.weather[0].description)
        }
        else{
            
        }
        
    })
}