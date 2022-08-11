'use strict';

let myLat, myLng;
const search = document.getElementsByClassName("search")[0];
const searchBox = document.getElementsByClassName("searchBox")[0];
search.addEventListener("click", function(){
    searchBox.classList.add("active");
    document.getElementById("search").focus();
});
document.getElementById("search").addEventListener("blur", function(){
    searchBox.classList.remove("active");
})

// 위치값 받아오기
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position) => {
        myLat = position.coords.latitude;
        myLng = position.coords.longitude;
        getWeather(myLat, myLng, "");
    });
}

function getWeather(lat, lon, city){
    const url = "https://api.openweathermap.org/data/2.5/forecast";
    const apikey = "b1f992fd26b2991a5912c0e5bcbafba6";
    let mydata;
    // console.log(city);
    if(city == ''){
        mydata = {
            lat: lat,
            lon: lon,
            appid: apikey,
            units: 'metric',
            lang: 'kr'
        }
    }else{
        mydata = {
            q: city,
            appid: apikey,
            units: 'metric',
            lang: 'kr'
        }
    }
    // key=value&key
    let params = Object.keys(mydata).map(key => key + '=' + mydata[key]).join('&');
    // console.log(params);
    // fetch(url, {
    //     method: 'post',
    //     cache: 'none',
    //     headers: {
    //         'content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     body: new URLSearchParams(mydata)
    // })
    fetch(`${url}?${params}`)
        .then(reson => reson.json())
        .then(rs => {
            let nowTime = new Date(rs.list[0].dt*1000);
            // console.log(nowTime);
            document.getElementsByClassName("ntime")[0].innerHTML = `${nowTime.getMonth() +1}월 ${nowTime.getDate()}일 ${nowTime.getHours()}시 ${nowTime.getMinutes()}분`;
            // console.log(rs.list[0].weather[0].icon);
            document.getElementById("nowtemp").innerHTML = `${rs.list[0].main.temp.toFixed(1)}&deg;`;
            document.getElementById("minmaxtemp").innerHTML = `${rs.list[0].main.temp_max.toFixed(1)}&deg;/ ${rs.list[0].main.temp_min.toFixed(1)}&deg;`;
            document.getElementById("desc").innerHTML = rs.list[0].weather[0].description;

            let sunriseTime = new Date(rs.city.sunrise*1000);
            let sunsetTime = new Date(rs.city.sunset*1000);
            let sunrise = `${sunriseTime.getHours()} : ${sunriseTime.getMinutes()}`;
            let sunset = `${sunsetTime.getHours()} : ${sunsetTime.getMinutes()}`
            document.getElementById("sunrise").innerHTML = sunrise;
            document.getElementById("sunset").innerHTML = sunset;

            document.getElementById("wind").innerHTML = `${rs.list[0].wind.speed.toFixed(1)}m/s`;
            document.getElementById("humidity").innerHTML = rs.list[0].main.humidity;
            document.getElementById("cloud").innerHTML = rs.list[0].clouds.all;
            document.getElementById("feelslike").innerHTML = rs.list[0].main.feels_like.toFixed(1) + "&deg;";
            let html = "";
            for(let i in rs.list){
                let dateTime = new Date(rs.list[i].dt*1000);
                let dayHours = formatAMPM(dateTime.getHours());
                let dayDate = `${nowTime.getMonth() +1}월 ${nowTime.getDate()}일 ${dayHours}시`;
                let day_temp = `${rs.list[i].main.temp_max}&deg;/ ${rs.list[i].main.temp_min}&deg;`;
                let day_desc = rs.list[i].weather[0].description;
                html += `
                <li>
                    <div class="dayWeather swiper-slide">
                        <p class="daydate">${dayDate}</p>
                        <img src="images/${rs.list[i].weather[0].icon}.svg" alt="01d">
                        <p class="daytemp">${day_temp}</p>
                        <p class="daydesc">${day_desc}</p>
                    </div>
                </li>
                `;
            }
            //document.getElementById('swipper').innerHTML = html;
        })
}

function formatAMPM(hours){
    let ampm = hours > 12 ? hours - 12 : hours;
    return hours >= 12 ? `PM ${ampm}` : `AM ${ampm}`;
}


function wicon(icon){
    let wcs;
    let bk = false;
    let viewIcon = new Array();
    switch(icon){
        case "01d":
            wcs = "wi-day-sunny";
            break;
        case "02d":
            wcs = "wi-day-cloudy";
            break;
        case "03d":
            wcs = "wi-cloud";
            break;
        case "04d":
            wcs = "wi-cloudy";
            break;
        case "09d":
            wcs = "wi-showers";
            break;
        case "10d":
            wcs = "wi-rain";
            break;
        case "11d":
            wcs = "wi-thunderstorm";
            break;
        case "13d":
            wcs = "wi-snowflake-cold";
            break;
        case "50d":
            wcs = "wi-fog";
            break;
        case "01d":
            wcs = "wi-day-sunny";
            break;
        case "02d":
            wcs = "wi-day-cloudy";
            break;
        case "03d":
            wcs = "wi-cloud";
            break;
        case "04d":
            wcs = "wi-cloudy";
            break;
        case "09d":
            wcs = "wi-showers";
            break;
        case "10d":
            wcs = "wi-rain";
            break;
        case "11d":
            wcs = "wi-thunderstorm";
            break;
        case "13d":
            wcs = "wi-snowflake-cold";
            break;
        case "50d":
            wcs = "wi-fog";
            break;
        
        case "01n":
            wcs = "wi-day-sunny";
            break;
        case "02n":
            wcs = "wi-day-cloudy";
            break;
        case "03n":
            wcs = "wi-cloud";
            break;
        case "04n":
            wcs = "wi-cloudy";
            break;
        case "09n":
            wcs = "wi-showers";
            break;
        case "10n":
            wcs = "wi-rain";
            break;
        case "11n":
            wcs = "wi-thunderstorm";
            break;
        case "13n":
            wcs = "wi-snowflake-cold";
            break;
        case "50n":
            wcs = "wi-fog";
            break;
    }
}