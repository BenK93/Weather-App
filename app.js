window.addEventListener('load', () => {
    let long;
    let lat;
    let locationTimeZone = document.querySelector(".location-timezone");
    let tempDegree = document.querySelector(".temperature-degree");
    let tempDecs = document.querySelector(".temperature-decs");
    let iconElement = document.querySelector(".icon1");
    let tempMeasure = document.querySelector(".degree-section span");
    let temperature = document.querySelector(".temperature");
    let api_key = `c41070bc5ddf47c55b7c23d7b4701846`;
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(pos =>{
            console.log(pos);
            long = pos.coords.longitude;
            lat = pos.coords.latitude;
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api_lon_lat = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}&units=metric`;
            
            fetch(api_lon_lat).then(response => {
                return response.json(); // getting json
            })
            .then(data => { // The API data
                console.log(data);
                const {temp,temp_min, temp_max, humidity} = data.main;
                const {description } = data.weather[0];
                const {country} = data.sys;
                var timeZone = country + ' / ' +data.name;
                locationTimeZone.textContent = timeZone;
                tempDecs.textContent = description;
                let celsius = temp;
                tempDegree.textContent = celsius;
                setIcon(description, iconElement);
                temperature.addEventListener("click", () => {
                    tempMeasure.textContent = "C" == tempMeasure.textContent ? "F" : "C";
                    var bool = (tempMeasure.textContent == "C") ? true : false;
                    let fahrenheit = (temp * 9 / 5) + 32;
                    tempDegree.textContent = (bool == true) ? celsius : fahrenheit.toFixed(2);
                })
            });

        });
    }else {
        // not knowing the location 
        console.log("happending");
        locationTimeZone.textContent = "😩Please allow location!";
        tempDecs.textContent = "Refresh the page and try again";

    }
    function setIcon(weatherCondition, iconID){
        const skycon = new Skycons({color: "white"});
        const weathersJSON = '{"clear_sky":"CLEAR_DAY","few_clouds":"PARTLY_CLOUDY_DAY","scattered_clouds":"CLOUDY","rain":"RAIN","shower rain":"SLEET","snow":"SNOW","thunderstorm":"SLEET","mist":"FOG"}';
        var jsonObj = JSON.parse(weathersJSON);
        var condition = weatherCondition.replace(" ", "_");
        condition = jsonObj[condition];
        skycon.play();
        return skycon.set(iconID,Skycons[condition]);
    }
})