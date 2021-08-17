console.log("hello world")
const getData = async (city) => {
    searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b20325be3b605e5568bb052f485130a3`;
    let response = await fetch(searchUrl);
    return response.json(); //return the promise
}
//load data
const loadData = async (e) => {
    console.log('anything')
    e.preventDefault();
    console.log(e);
    const weatherSearch = e.target[1].value;
    console.log(weatherSearch + ' Searching for weather here');

    const weatherData = await getData(weatherSearch);
    console.log(weatherData);
    
    createWeatherHTML(weatherData);
    
}
// temp converter
function temperatureConverter(valNum) {
    valNum = parseFloat(valNum);
    let kel2far = ((valNum-273.15)*1.8)+32;
    return Math.round(kel2far)
}
let modifyBackgroundImg = (city) => {
    document.body.style.backgroundImage = `url("https://source.unsplash.com/2000x1000/?${city},city")`;
}
// let changeIcon = (i) => {
    //     let addImg = document.body.getElementById("forecast");
    //     let iconImg = `url("http://openweathermap.org/img/wn/${icons}@2x.png")`;
    
    // }
let changeIcons = (i) => {
    document.querySelector("img").src = `https://openweathermap.org/img/wn/${i}@2x.png`;

}
  //Display Data in HTML
    const createWeatherHTML = (data) => {
    const cityName = data.name
    const currentTemp = data.main.temp
    const forecast = data.weather[0].description
    const highTemp = data.main.temp_max
    const lowTemp = data.main.temp_min
    const humidity = data.main.humidity
    const icons = data.weather[0].icon
    console.log(cityName,currentTemp,forecast,highTemp,lowTemp,humidity, icons);
    let weatherDisplay = document.getElementById('weatherDisplay');
    modifyBackgroundImg(cityName);
    changeIcons(icons);
    
    
    // document.body.style = 
    // let forecastImg = document.getElementById("imgs");
    // forecastImg.innerHTML = icons;
    // weatherDisplay.insertAdjacentElement("afterend", forecastImg)

    // weatherDisplay.insertAdjacentElement("beforeend", htmlIcon);


    let htmlName = document.getElementById("city-title");
    htmlName.innerHTML = cityName;
    weatherDisplay.insertAdjacentElement('beforeend', htmlName);
      
    let htmlCurrentTemp = document.getElementById("current-temp");
    htmlCurrentTemp.innerHTML = "Current Temperature: " + temperatureConverter(currentTemp)+"°F";
    weatherDisplay.insertAdjacentElement('beforeend', htmlCurrentTemp);
    
    let htmlForecast = document.getElementById("forecast");
    htmlForecast.innerHTML = "Forecast: " + forecast;
    weatherDisplay.insertAdjacentElement('beforeend', htmlForecast);

    let htmlHumidity = document.getElementById("humidity");
    htmlHumidity.innerHTML = "Humidity: " + humidity+"%";
    weatherDisplay.insertAdjacentElement('beforeend', htmlHumidity);

    let htmlHighTemp = document.getElementById("high");
    htmlHighTemp.innerHTML = "High for today: " + temperatureConverter(highTemp)+"°F";
    weatherDisplay.insertAdjacentElement('beforeend', htmlHighTemp);

    let htmlLowTemp = document.getElementById("low");
    htmlLowTemp.innerHTML = "Low for today: " + temperatureConverter(lowTemp)+"°F";
    weatherDisplay.insertAdjacentElement('beforeend', htmlLowTemp);
    

}
//connect form to load function
const form = document.getElementById("weatherDataForm");
form.addEventListener('submit', loadData);
