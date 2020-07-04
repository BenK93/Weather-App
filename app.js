window.addEventListener('load', () => {
    let long;
    let lat;
    let locationTimeZone = document.querySelector(".location-timezone");
    let tempDegree = document.querySelector(".temperature-degree");
    let tempDecs = document.querySelector(".temperature-decs");
    let iconElement = document.querySelector(".icon1");
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
                tempDegree.textContent = temp;
                setIcon(description, iconElement);
            });

        });
    }else {
        // not knowing the location 
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