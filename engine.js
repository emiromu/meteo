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

const key = '484e301936b57b282774bca33781f11b';

function getCityData(city,key){

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then(response => response.json())
    .then(data => console.log(data));
};

getCityData('Paris',key);