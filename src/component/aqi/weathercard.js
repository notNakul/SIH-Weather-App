import React, { useEffect,useState } from "react";
// import Clock from 'react-live-clock';
const Weathercard = (
    {temp,
    humidity,
    pressure,
    weathermood,
    name,
    speed,
    country,
    sunset,pm10,pm25,dominentpol,actual_aqi,v}) => {
    const [weatherState, setWeatheState] = React.useState("");


// console.log(pm2_5);
// var d= new Date();
const [time, setTime] = useState(new Date().toLocaleString());

useEffect(() => {
    // let d= new Date();
  const interval = setInterval(() => setTime(new Date().toLocaleString()), 1000);
  return () => {
    clearInterval(interval);
  };
}, []);

useEffect(() => {
    if (weathermood) {
        switch (weathermood) {
            case "Clouds":
                setWeatheState("wi-day-cloudy");
                break;
            case "Haze":
                setWeatheState("wi-fog");
                break;
            case "Clear":
                setWeatheState("wi-day-sunny");
                break;
            case "Mist":
                setWeatheState("wi-dust");
                break;

            default:
                setWeatheState("wi-day-sunny");
                break;
        }
    }
}, [weathermood]);

// function componentDidMount(){
//     this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
//   }
//   componentWillUnmount() {
//     clearInterval(this.interval);
//   }
// console.log(pm10,pm25,dominentpol)

// let ab={pm34: 35} ;

// converting the seconds into time
// console.log(pm10);
let sec = sunset;
let date = new Date(sec * 1000);
let timeStr = `${date.getHours()}:${date.getMinutes()}`;
return (
    <>
    
        <article className="widget">
            <div className="weatherIcon">
                <i className={`wi ${weatherState}`}></i>
                <div className="weatherInfo" id="aqi"> AQI <span id="aqi_colour"> {v}</span></div>

            </div>

            <div className="weatherInfo" id="weInfo">
                <div className="temperature">
                    <span>{temp}&deg;</span>
                </div>

                <div className="description">
                    <div className="weatherCondition">{weathermood}</div>
                    <div className="place">
                        {name}, {country}
                    </div>
                </div>
            </div>

            <div className="date"> {time}</div>

            {/* our 4column section  */}
            <div className="extra-temp">
                <div className="temp-info-minmax">
                    <div className="two-sided-section">
                        <p>
                            <i className={"wi wi-sunset"}></i>
                        </p>
                        <p className="extra-info-leftside">
                            {timeStr} PM <br />
                            Sunset
                        </p>
                    </div>

                    <div className="two-sided-section">
                        <p>
                            <i className={"wi wi-humidity"}></i>
                        </p>
                        <p className="extra-info-leftside">
                            {humidity} <br />
                            Humidity
                        </p>
                    </div>
                </div>

                <div className="weather-extra-info">
                    <div className="two-sided-section">
                        <p>
                            <i className={"wi wi-rain"}></i>
                        </p>
                        <p className="extra-info-leftside">
                            {pressure} <br />
                            Pressure
                        </p>
                    </div>

                    <div className="two-sided-section">
                        <p>
                            <i className={"wi wi-strong-wind"}></i>
                        </p>
                        <p className="extra-info-leftside">
                            {speed} <br />
                            Speed
                        </p>
                    </div>
                </div>
            </div>
        <div className="regbox">
        <div className="reg_nos">Robin Bhati <span id="robin">20BAI10187</span> </div>
        <div className="reg_nos" >Nakul Gehlaut <span id="nakul">20BAI10019</span> </div>
        <div className="reg_nos" >Yashi Saxena <span id="yashi">20BCE10240</span> </div>
        
            </div>
            <div id="regnos" className="regbox">
            <div className="reg_nos">Shantanu Kasana <span id="shan">20BCE10557</span> </div>
            <div className="reg_nos">Aditya Kumar Verma 20BAI10240 </div>
            
            <div className="reg_nos" >Adesh Pramod Yadav 20BAI10118 </div>
            
        
        
            </div>
        </article>
    </>
);
};

export default Weathercard;