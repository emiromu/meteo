/**Free public API Key goes here*/
const key = '';

function createWeatherCard(apiData,units){

    /**Wind speed Beaufort scale  */
    /*
    Metric: 
    Light winds	19 km/h or less
4	Moderate winds	20 - 29 km/h
5	Fresh winds	30 - 39 km/h
6	Strong winds	40 - 50 km/h

    Imperial: 
    11 mph or less
    11+ to 18 mph
    18+ to 24 mph
    24+ to 31 mph
    */
    const weatherCard = {
        name:apiData.name,
        units:units,
        temperature:apiData.main.temp,
        temperature_max:apiData.main.temp_max,
        temperature_min:apiData.main.temp_min,
        humidity:apiData.main.humidity,
        windspeed:apiData.wind.speed,
        windrating:'',
        description:apiData.weather[0].description.charAt(0).toUpperCase() + apiData.weather[0].description.slice(1)
    };

    if(units=='metric'){
        if(weatherCard.windspeed<=0)weatherCard.windrating='No wind';
        else if(weatherCard.windspeed<20)weatherCard.windrating='Light winds';
        else if(weatherCard.windspeed<30)weatherCard.windrating='Moderate winds';
        else if(weatherCard.windspeed<40)weatherCard.windrating='Fresh winds';
        else if(weatherCard.windspeed<50)weatherCard.windrating='Strong winds';
        else weatherCard.windrating='Very strong winds';

    }else if(units=='imperial'){
        if(weatherCard.windspeed<=0)weatherCard.windrating='No wind';
        else if(weatherCard.windspeed<11)weatherCard.windrating='Light winds';
        else if(weatherCard.windspeed<18)weatherCard.windrating='Moderate winds';
        else if(weatherCard.windspeed<24)weatherCard.windrating='Fresh winds';
        else if(weatherCard.windspeed<31)weatherCard.windrating='Strong winds';
        else weatherCard.windrating='Very strong winds';

    }

    return weatherCard
};

function createWeatherReport(weatherCard){

    const weatherReport = document.createElement('div');
    weatherReport.classList.add('report');

    const reportTitle = document.createElement('h5');
    reportTitle.innerHTML=weatherCard.name;
    reportTitle.style.width="100%";

    const reportDescription = document.createElement('div');
    reportDescription.innerHTML=`Overall condition : ${weatherCard.description}`;
    reportDescription.style="width:100%;text-align:center;margin:0;padding:0;";

    const reportTemperature = document.createElement('div');
    reportTemperature.classList.add('report-box');
    reportTemperature.innerHTML=`Temperature&nbsp:&nbsp${weatherCard.temperature}°C`
    +"<br><br>"
    +`Min&nbsp:&nbsp${weatherCard.temperature_min}°C&nbsp&nbspMax&nbsp:&nbsp${weatherCard.temperature_max}°C`;

    const reportHumidity = document.createElement('div');
    reportHumidity.classList.add('report-box');
    reportHumidity.innerHTML=`Humidity&nbsp:&nbsp${weatherCard.humidity}%`;

    const reportWind = document.createElement('div');
    reportWind.classList.add('report-box');
    reportWind.innerHTML=`${weatherCard.windrating}`
    +"<br><br>"
    +`(Speed&nbsp:&nbsp${weatherCard.windspeed}&nbspkmh)`;

    weatherReport.appendChild(reportTitle);
    weatherReport.appendChild(reportDescription);
    weatherReport.appendChild(reportTemperature);
    weatherReport.appendChild(reportHumidity);
    weatherReport.appendChild(reportWind);

    return weatherReport;
};

function renderWeatherReport(pannel,weatherCard){
   pannel.innerHTML='';
   while(pannel.firstChild)pannel.removeChild(pannel.firstChild);

   pannel.appendChild(createWeatherReport(weatherCard));
};

//units : standard, metric, imperial
async function getCityData(cityName,key,units){
    if(units == undefined)units='standard';
    weatherPannel.innerHTML='Loading...';

    let weatherCard = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=${units}`)
    .then(response => response.json())
    .then(data => {
        return createWeatherCard(data,units)
    })
    return weatherCard;
};

const cityInput = document.querySelector(`#cityInput`);
const searchButton = document.querySelector(`#searchButton`);
const weatherPannel = document.querySelector(`#weatherPannel`);

searchButton.addEventListener(`click`,function(e){
    if (!cityInput.checkValidity()) {
        if(cityInput.validationMessage=='Please fill out this field.'){
            weatherPannel.innerHTML = `Please enter a city name.`;
        }else if(cityInput.validationMessage=='Please match the requested format.'){
            weatherPannel.innerHTML = `Please only use alpha-numeric characters for the city name.`;
        };
        return false;
    };
    getCityData(cityInput.value,key,'metric')
    .then(data=>{
        //console.log(data);
        renderWeatherReport(weatherPannel,data);
    })
    .catch(error=>{
        //'400' 'Nothing to geocode' => handled with form validation
        //'404' 'city not found'
        //console.log(error);
        weatherPannel.innerHTML=`No such city name has been found :(`;
    });
});

cityInput.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        searchButton.click();
    }
});
