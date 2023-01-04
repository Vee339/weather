import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"


function Temp(){
    const [city, setCity] = React.useState("Mumbai")
    const [weather, setWeather] = React.useState([])
    const [desc, setDesc] = React.useState()
    
    React.useEffect(()=>{
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=43f2f3996a0fbf0fe9968e5409672bbc
        `)
        .then(res => res.json())
        .then((data)=>{
            setWeather(data.main)
            setDesc(data.weather)
        })

    },[city])

    function handleChange(event){
             setCity(event.target.value)
    }

    return(
        <>
        <div className="inputBox">
            <div className="searchBox">
                <label htmlFor="city"><FontAwesomeIcon icon={faMagnifyingGlass} /></label>
                <input 
                    placeholder="Enter City" 
                    type="text"
                    id="city" 
                    name="city"
                    onChange={handleChange}
                     
                 />
            </div>
        </div>
        {!weather ?
        <p>No data found</p>:
        <><div className="content">
        <div className="info">
            <div className="minmax">
                <div className="min">Min-{Math.floor(weather.temp_min - 273.15)}°</div>
                <div className="max">Max-{Math.floor(weather.temp_max - 273.15)}°</div>
            </div>
            <div className="actual"><span>{Math.floor(weather.temp - 273.15)}°</span>C</div>
            <div className="feels-like">Feels like {Math.floor(weather.feels_like - 273.15)}°</div>
        </div>
        <div className="description">
            <div className="icon">{!desc ? "" : <img src={`http://openweathermap.org/img/wn/${desc[0].icon}@2x.png`} alt="weather_icon" />}</div>
            <div className="desc">{!desc ? "" : desc[0].description}</div>
        </div>
    </div>
    <div className="otherinfo">
        <div className="humidity">Humidity-{weather.humidity}</div>
        <div className="pressure">Pressure-{weather.pressure}</div>
        
    </div></>}
            
        </>
    )
}

export default Temp