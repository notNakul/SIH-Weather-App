import React, { useState, useEffect } from "react";
import Weathercard from "./weathercard";
import "./style.css";

// a46e1cc8161244dbbe282ef8e32f9a82
const Temp = () => {
  const [searchValue, setSearchValue] = useState("Bhopal");
  const [tempInfo, setTempInfo] = useState({});
  const [aqiInfo, setAqiInfo] = useState({});
  const [geoLocatinInfo, setGeoLocationInfo] = useState({});
  const [actualAqiInfo, setactualAqiInfo] = useState({});


  const getGeoLocationInfo = async () => {
    try {
      let url = `https://nominatim.openstreetmap.org/search.php?city=${searchValue}&country=india&format=jsonv2`;
      let res = await fetch(url);
      let data = await res.json();
      //   console.log(data);

      const { lat, lon } = data[0];
      const newGeoLocation = { lat, lon };
      // setGeoLocationInfo(newGeoLocation);
      // console.log(newGeoLocation);
      return newGeoLocation;

      //   const{pm2_5}= data.list[0].components;
      //   const newAqiInfo={pm2_5};
      //   setAqiInfo(newAqiInfo);
      //   console.log(pm2_5);
    }
    catch (error) {
      console.log(error);
    }
  };

  const getAqiInfo = async (location) => {
    try {
      // let url=`http://api.airvisual.com/v2/nearest_city?lat=${location.lat}&lon=${location.lon}&key=b4c31bd4-f63a-4358-95e5-e1693e691e7d`;
      let url=`https://api.waqi.info/feed/geo:${location.lat};${location.lon}/?token=fb04d7a668946279fdb41ff2943637527ae250d7`;
      // let url=`http://api.openweathermap.org/data/2.5/air_pollution?lat=${location.lat}&lon=${location.lon}&appid=37dfab4af40d2e1b9558034272b797c0`;
      let res = await fetch(url);
      let datan = await res.json();
      // console.log(datan);
      // console.log(geoLocatinInfo.lat)

      const { pm10,pm25 } = datan.data.iaqi;
      const { dominentpol } = datan.data;

      // console.log(pm10,pm25,dominentpol);

      const newAqiInfo = { pm10,pm25,dominentpol};
      // const newAqiInfo2 = { dominentpol };
      // setAqiInfo(newAqiInfo);
      // console.log(newAqiInfo);

      return newAqiInfo;

      // fetch(`https://api.ambeedata.com/latest/by-lat-lng?lat=${location.lat}&lng=${location.lon}`, {
      //   "method": "GET",
      //   "headers": {
      //     "x-api-key": "5eee03b0cd568c7f324b8c6b1d6c875d9811cefe257890d4867164e92954d066",
      //     "Content-type": "application/json"
      //   }
      // })
      //   .then(response => {
      //     console.log(response);
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   });

      // fetch("https://api.ambeedata.com/latest/by-city?city=Bengaluru", {
      //   "method": "GET",
      //   "headers": {
      //     "x-api-key": "5eee03b0cd568c7f324b8c6b1d6c875d9811cefe257890d4867164e92954d066",
      //     "Content-type": "application/json"
      //   }
      // })
      //   .then(response => {
      //     console.log(response);
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   });

    }
    catch (error) {
      console.log(error);
    }
  };
  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=37dfab4af40d2e1b9558034272b797c0`;
      let res = await fetch(url);
      let data = await res.json();
      // console.log(data);
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      // setTempInfo(myNewWeatherInfo);
      return myNewWeatherInfo;
    } catch (error) {
      console.log(error);
    }
  };

  //   useEffect(() => {
  // }, []);
  let actual_aqi;
function domient_aqi(){if(aqiInfo.dominentpol==="pm10"){

    actual_aqi=aqiInfo.pm10;
    // console.log(actual_aqi);
    return actual_aqi;
    setactualAqiInfo(actual_aqi);
  }
  else{
    actual_aqi=aqiInfo.pm25;
    // console.log(actual_aqi);
    return actual_aqi;
    setactualAqiInfo(actual_aqi);

}}


useEffect(async () => {
  const weather = await getWeatherInfo();
    setTempInfo(weather);

    const location = await getGeoLocationInfo();
    setGeoLocationInfo(location);

    const aqi = await getAqiInfo(location);
    // console.log(aqi);
    setAqiInfo(aqi);
    // console.log(aqiInfo);
    
    const act_aqi= await domient_aqi();
    console.log(act_aqi);
    setactualAqiInfo(act_aqi);
    // domient_aqi();
    
    // aqi_colour();

    // document.getElementById("aqi_colour").value="Click search";
    
    
  }, []);
//   ("document").ready(function() {
//     setTimeout(function() {
//         ("ul.galleria li:first-child img").trigger('click');
//     },10);
// });
  // document.getElementById("aqi_colour").style.color = "#ff7e00";
  
  // function aqi_colour(){
  //   var aqiFo=document.getElementById("aqi_colour").innerHTML;
  //   // parseInt(aqiFo);
  //   console.log(aqiFo.type)
  //   if (0<aqiFo<50){
  //     document.getElementById("aqi_colour").style.color = "#00e400";
  //   }
  //   else if (51<aqiFo<100){  
      // document.getElementById("aqi_colour").style.color = "#ffff00";
  //   }
  //   else if (101<aqiFo<150){
  //   }
  //   else if (151<aqiFo<200){
  //     document.getElementById("aqi_colour").style.color = "#ff0000";
  //   }
  //   else if (201<aqiFo<300){
  //     document.getElementById("aqi_colour").style.color = "#99004c";
  //   }
  //   else if (aqiFo>301){
  //     document.getElementById("aqi_colour").style.color = "#7e0023";
  //   }
  //   else{
  //     document.getElementById("aqi_colour").style.color = "black" ;
  //   }
  // }
  

  // #00e400
  //   let lon;
  //   let lat;
  //   geoLocatinInfo={lat,lon};
  // console.log(lat);
  //   console.log(aqiInfo);
  // console.log(geoLocatinInfo.lat)
  // console.log(geoLocatinInfo["lat"])
  const masterFunction = async () => {
    const weather = await getWeatherInfo();
    setTempInfo(weather);

    const location = await getGeoLocationInfo();
    setGeoLocationInfo(location);

    const aqi = await getAqiInfo(location);
    setAqiInfo(aqi);

    const act_aqi= await domient_aqi();
    // console.log(act_aqi);
    setactualAqiInfo(act_aqi);

    // aqi_colour();
    
  };

  // var input = document.getElementById("search");

  // Execute a function when the user releases a key on the keyboard
//   input.addEventListener("keyup", function(event) {
//     // Number 13 is the "Enter" key on the keyboard
//     if (event.key === "Enter") {
//       // Cancel the default action, if needed
//       event.preventDefault();
//       // Trigger the button element with a click
//       document.getElementById("searchBtn").click();
//     }
// });

  // console.log(aqiInfo);
  return (
    <>
      {/* <div id="shi" className="wrap">
        
        </div> */}
      <div className="wrap">
        <div id="shi" className="break gradientColour"><span id="sih">VIRUPAKSHA</span> <img src="vitLogo.jpg" id="vitLogo"></img></div>
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            id="searchBtn"
            onClick={masterFunction}>
            Search
          </button>
        </div>
      </div>

      {/* our temp card  */}
      <Weathercard {...tempInfo}{...aqiInfo}{...actualAqiInfo} />
    </>
  );
};

export default Temp;































// import React, { useState, useEffect } from "react";
// import Weathercard from "./weathercard";
// import "./style.css";

// // a46e1cc8161244dbbe282ef8e32f9a82
// const Temp = () => {
//   const [searchValue, setSearchValue] = useState(null);
//   // const [tempInfo, setTempInfo] = useState({});
//   // const [aqiInfo, setAqiInfo] = useState({});
//   // const [geoLocatinInfo, setGeoLocationInfo] = useState({});
//   // const [actualAqiInfo, setactualAqiInfo] = useState({});
//   // const [loading, setLoading] = useState(true);
//   const [allData, setAllData] = useState({});

//   useEffect(async () => {
//     try {
//       let url = `https://api.openweathermap.org/data/2.5/weather?q=${!searchValue ? "Delhi" : searchValue}&units=metric&appid=37dfab4af40d2e1b9558034272b797c0`;
//       let res = await fetch(url);
//       let data = await res.json();
//       // console.log(data);
//       const { temp, humidity, pressure } = data.main;
//       const { main: weathermood } = data.weather[0];
//       const { name } = data;
//       const { speed } = data.wind;
//       const { country, sunset } = data.sys;

//       const myNewWeatherInfo = {
//         temp,
//         humidity,
//         pressure,
//         weathermood,
//         name,
//         speed,
//         country,
//         sunset,
//       };
      
//       url = `https://nominatim.openstreetmap.org/search.php?city=${!searchValue ? "Delhi" : searchValue}&country=india&format=jsonv2`;
//       res = await fetch(url);
//       data = await res.json();
//         // console.log(data);

//       const { lat, lon } = data[0];
//       const newGeoLocation = { lat, lon };
//       // setGeoLocationInfo(() => newGeoLocation);

//       // console.log(newGeoLocation);
//       url = `https://api.waqi.info/feed/geo:${newGeoLocation.lat};${newGeoLocation.lon}/?token=fb04d7a668946279fdb41ff2943637527ae250d7`;
//       res = await fetch(url);
//       res.json().then((data) => {
//         const { pm10,pm25 } = data.data.iaqi;
//         const { dominentpol } = data.data;

//         const newAqiInfo = { pm10,pm25,dominentpol};
        
//         console.log(myNewWeatherInfo, newAqiInfo, newGeoLocation);

//         setAllData({
//           weather: myNewWeatherInfo,
//           geo: newGeoLocation,
//           aqi: newAqiInfo
//         })

//         // setLoading(() => false);
//       });

//       // const { pm10,pm25 } = data.data.iaqi;
//       // const { dominentpol } = data.data;

//       // const newAqiInfo = { pm10,pm25,dominentpol};
//       // // console.log(newAqiInfo);

//       // setAqiInfo(newAqiInfo);


//     }
//     catch (error) {
//       console.log(error);
//     }
//   }, [searchValue]);


  

//   // const getAqiInfo = async (location) => {
//   //   try {
//   //     // let url=`http://api.airvisual.com/v2/nearest_city?lat=${location.lat}&lon=${location.lon}&key=b4c31bd4-f63a-4358-95e5-e1693e691e7d`;
//   //     let url=`https://api.waqi.info/feed/geo:${location.lat};${location.lon}/?token=fb04d7a668946279fdb41ff2943637527ae250d7`;
//   //     // let url=`http://api.openweathermap.org/data/2.5/air_pollution?lat=${location.lat}&lon=${location.lon}&appid=37dfab4af40d2e1b9558034272b797c0`;
//   //     let res = await fetch(url);
//   //     let datan = await res.json();
//   //     const { pm10,pm25 } = datan.data.iaqi;
//   //     const { dominentpol } = datan.data;

//   //     const newAqiInfo = { pm10,pm25,dominentpol};

//   //     return newAqiInfo;

//   //     // fetch(`https://api.ambeedata.com/latest/by-lat-lng?lat=${location.lat}&lng=${location.lon}`, {
//   //     //   "method": "GET",
//   //     //   "headers": {
//   //     //     "x-api-key": "5eee03b0cd568c7f324b8c6b1d6c875d9811cefe257890d4867164e92954d066",
//   //     //     "Content-type": "application/json"
//   //     //   }
//   //     // })
//   //     //   .then(response => {
//   //     //     console.log(response);
//   //     //   })
//   //     //   .catch(err => {
//   //     //     console.error(err);
//   //     //   });

//   //     // fetch("https://api.ambeedata.com/latest/by-city?city=Bengaluru", {
//   //     //   "method": "GET",
//   //     //   "headers": {
//   //     //     "x-api-key": "5eee03b0cd568c7f324b8c6b1d6c875d9811cefe257890d4867164e92954d066",
//   //     //     "Content-type": "application/json"
//   //     //   }
//   //     // })
//   //     //   .then(response => {
//   //     //     console.log(response);
//   //     //   })
//   //     //   .catch(err => {
//   //     //     console.error(err);
//   //     //   });

//   //   }
//   //   catch (error) {
//   //     console.log(error);
//   //   }
//   // };
//   // const getWeatherInfo = async () => {
//   //   try {
//   //     let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=37dfab4af40d2e1b9558034272b797c0`;
//   //     let res = await fetch(url);
//   //     let data = await res.json();
//   //     // console.log(data);
//   //     const { temp, humidity, pressure } = data.main;
//   //     const { main: weathermood } = data.weather[0];
//   //     const { name } = data;
//   //     const { speed } = data.wind;
//   //     const { country, sunset } = data.sys;

//   //     const myNewWeatherInfo = {
//   //       temp,
//   //       humidity,
//   //       pressure,
//   //       weathermood,
//   //       name,
//   //       speed,
//   //       country,
//   //       sunset,
//   //     };

//   //     // setTempInfo(myNewWeatherInfo);
//   //     return myNewWeatherInfo;
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   //   useEffect(() => {
//   // }, []);
//   // let actual_aqi;
// // function domient_aqi(){if(aqiInfo.dominentpol==="pm10"){

// //     actual_aqi=aqiInfo.pm10;
// //     console.log(actual_aqi);
// //     return actual_aqi;
// //     setactualAqiInfo(actual_aqi);
// //   }
// //   else{
// //     actual_aqi=aqiInfo.pm25;
// //     console.log(actual_aqi);
// //     return actual_aqi;
// //     setactualAqiInfo(actual_aqi);

// // }}


// // useEffect(async () => {
// //   const weather = await getWeatherInfo();
// //     setTempInfo(weather);

// //     const location = await getGeoLocationInfo();
// //     setGeoLocationInfo(location);

// //     const aqi = await getAqiInfo(location);
// //     console.log(aqi);
// //     setAqiInfo(aqi);
// //     // console.log(aqiInfo);
    
// //     const act_aqi= await domient_aqi();
// //     console.log(act_aqi);
// //     setactualAqiInfo(act_aqi);
// //     domient_aqi();
    
// //     aqi_colour();
    
    
// //   }, []);
  
  
//   // function aqi_colour(){
//   //   if (0<aqiInfo-50<50){
//   //     document.getElementById("aqi_colour").style.color = "#00e400";
//   //   }
//   //   else if (51<aqiInfo<100){  
//   //     document.getElementById("aqi_colour").style.color = "#ffff00";
//   //   }
//   //   else if (101<aqiInfo<150){
//   //     document.getElementById("aqi_colour").style.color = "#ff7e00";
//   //   }
//   //   else if (151<aqiInfo<200){
//   //     document.getElementById("aqi_colour").style.color = "#ff0000";
//   //   }
//   //   else if (201<aqiInfo<300){
//   //     document.getElementById("aqi_colour").style.color = "#99004c";
//   //   }
//   //   else if (aqiInfo>301){
//   //     document.getElementById("aqi_colour").style.color = "#7e0023";
//   //   }
//   //   else{
//   //     document.getElementById("aqi_colour").style.color = "black" ;
//   //   }
//   // }
  

//   // #00e400
//   //   let lon;
//   //   let lat;
//   //   geoLocatinInfo={lat,lon};
//   // console.log(lat);
//   //   console.log(aqiInfo);
//   // console.log(geoLocatinInfo.lat)
//   // console.log(geoLocatinInfo["lat"])
//   // const masterFunction = async () => {
//   //   const weather = await getWeatherInfo();
//   //   setTempInfo(weather);

//   //   const location = await getGeoLocationInfo();
//   //   setGeoLocationInfo(location);

//   //   const aqi = await getAqiInfo(location);
//   //   setAqiInfo(aqi);

//   //   const act_aqi= await domient_aqi();
//   //   // console.log(act_aqi);
//   //   setactualAqiInfo(act_aqi);

//   //   aqi_colour();
    
//   // };

//   // var input = document.getElementById("search");

//   // Execute a function when the user releases a key on the keyboard
// //   input.addEventListener("keyup", function(event) {
// //     // Number 13 is the "Enter" key on the keyboard
// //     if (event.key === "Enter") {
// //       // Cancel the default action, if needed
// //       event.preventDefault();
// //       // Trigger the button element with a click
// //       document.getElementById("searchBtn").click();
// //     }
// // });

//   // console.log(aqiInfo);
//   return (
//     <>
//       {/* <div id="shi" className="wrap">
        
//         </div> */}
//       <div className="wrap">
//         <div id="shi" className="break gradientColour"><span id="sih">VIRUPAKSHA</span> <img src="vitLogo.jpg" id="vitLogo"></img></div>
//         <div className="search">
//           <input
//             type="search"
//             placeholder="search..."
//             autoFocus
//             id="search"
//             className="searchTerm"
//             value={!searchValue ? "Delhi" : searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//           />

//           <button
//             className="searchButton"
//             type="button"
//             id="searchBtn"
//             >
//             Search
//           </button>
//         </div>
//       </div>

//       {/* our temp card  */}
//       {console.log(allData.aqi)}
//       {allData.aqi.pm10 && <div>{allData.aqi.pm10.v}</div>}
//       {/* <Weathercard temp = {tempInfo} aqi = {aqiInfo} actualAqi = {actualAqiInfo} /> */}
//     </>
//   );
// };

// export default Temp;