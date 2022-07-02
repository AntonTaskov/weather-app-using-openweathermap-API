window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let locationCity = document.getElementById('city')
    let weatherimage = document.getElementById('weathetimg')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            ///Just in case if i need it main.humidity
            ///const proxy ="https://cors-anywhere.herokuapp.com/";

            const key = 'cc734d0cb00cbc01e92c7463ec40c5da'
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`

            console.log(api)
            fetch(api)
            .then(response =>{
                return response.json();
            }).then(data =>{
                console.log(data)
                // set DOM Element from the api
                const timezone = data.sys.country;
                const cityName = data.name;
                const temperature = data.main.temp;
                const description = data.weather[0].description;
                const weatherIcon = data.weather[0].icon;
                let celcius = (temperature - 273.15).toFixed(2);

                
                temperatureDegree.textContent = celcius;
                temperatureDescription.textContent = description;
                locationTimezone.textContent = timezone;
                locationCity.textContent = cityName;
                weatherimage.innerHTML = `<img src="icons/${weatherIcon}.png">`;

            })
        
        });

        

    }else{
        h1.textContent = 'You need to allow this app to track your location'
    }
});