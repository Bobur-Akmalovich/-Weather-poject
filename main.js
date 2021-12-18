const api = {
    key: '4960890c24a17f0caac1583e7334bfc3',
    mainurl: 'https://api.openweathermap.org/data/2.5/',
}

const searchBox = document.querySelector('.search__box');

searchBox.addEventListener('keypress', setQuery)

function setQuery(event){
    if(event.keyCode === 13){
        getResults(searchBox.value)
        // console.log("Hello!");
    }
}
 
function getResults(value){
    fetch(`${api.mainurl}weather?q=${value}&units=metric&APPID=${api.key}`)
       .then(weather => {
           return weather.json()
       }).then(displayResult)
}

function displayResult(weather) {
    console.log(weather);
    let city = document.querySelector('.city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`

     let now = new Date()

     let date = document.querySelector('.date');
     date.innerHTML = dateBuilder(now)
     
     let temp = document.querySelector('.temp');
     temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`

    let weatherEl = document.querySelector('.weather');
    weatherEl.innerHTML = weather.weather[0].main

    let hiLow = document.querySelector('.hi__low');
    hiLow.innerHTML = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`


    function dateBuilder(now){

      let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]

      let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
      let day = days[now.getDay()]
      let date = now.getDate()
      let month = months[now.getMonth()]

      let year = now.getFullYear()
      
      return `${day} ${date} ${month} ${year}`
     }
}