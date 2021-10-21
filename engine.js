/*

fetch('https://api.giphy.com/v1/gifs/translate?api_key=bPLCz3lzCRECdim17wMqZDbbHK05HMxH&s=cats', {mode: 'cors'})
    .then(function(response) {
      return response.json();
    }).then(function(resolve, reject){
        img.src=resolve.data.images.original.url;
    });


    
    fetch('http://example.com/movies.json')
    .then(response => response.json())
    .then(data => console.log(data));

    async function getCats(){
        const response = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=bPLCz3lzCRECdim17wMqZDbbHK05HMxH&s=cats', {mode: 'cors'});
        const catData = await response.json();
        img.src = catData.data.images.original.url;
    };
    
    getCats();
*/

/**Free public API Key, safe to let public for the scope of the project*/
const key = '484e301936b57b282774bca33781f11b';

function createWeatherCard(apiData){

    /**Wind speed scale */
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
        temperature:apiData.main.temp,
        temperature_max:apiData.main.temp_max,
        temperature_min:apiData.main.temp_min,
        humidty:apiData.main.humidity,
        windspeed:apiData.wind.speed,
        description:apiData.weather[0].description
    };


    return weatherCard
};

//units : standard, metric, imperial
async function getCityData(cityName,key,units){
    if(units == undefined)units='standard';
    let weatherCard = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=${units}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return createWeatherCard(data)
    })
    return weatherCard;
};


//let testData = getCityData('Paris',key,'metric')
//console.log(testData);

const cityInput = document.querySelector(`#cityInput`);
const searchButton = document.querySelector(`#searchButton`);
const weatherPannel = document.querySelector(`#weatherPannel`);

searchButton.addEventListener(`click`,function(e){
    console.log('Click Event');
    getCityData(cityInput.value,key,'metric')
    .then(data=>{
        console.log(data)
        weatherPannel.innerHTML=JSON.stringify(data);
    })
    .catch(error=>{
        //'400' 'Nothing to geocode'
        //'404' 'city not found'
        console.log(error.message)
        weatherPannel.innerHTML=error.message;
    });
});

cityInput.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        console.log('Enter keyup event');
        searchButton.click();
    }
});
