
// Ta funkcja zawsze zwraca Promise.
// Żeby z niej korzystać, musisz użyć funkcji then() na tym, co zwróci,
// w parametrze podając funkcję, która ma się wykonać
// np. getCurrentWeatherByCityName().then(data => showTemperature(data))
async function getCurrentWeatherByCityName(city) {
    try {
        const resp = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=02d0ad2d0f31ec73054791ff6851b6d5`)
        const body = await resp.json()
        return body
    } catch (err) {
        console.log(err)
    }
}
// Podobnie jak getCurrentWeatherByCityName, ale prognoza jest na najbliższe 5 dni, co 3 godziny
async function getForecastWeatherByCityName(city) {
    
    try {
        const resp = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=02d0ad2d0f31ec73054791ff6851b6d5`)
        const body = await resp.json()
        return body
    } catch (err) {
        console.log(err)
    } 
}


// temperatura zaokrąglona do pełnych stopni Celsjusza
function showTemperature(data, query) {
    // document.querySelector(query).innerHTML = Math.round(data.main.temp)
    console.log('Temperatura: ', data.main)
    return Math.round(data.main.temp)
}
// opis, np. Rain, Cloud itp. Niestety opisy czasem bywają długie
function showDescription(data, query) {
    // document.querySelector(query).innerHTML = data.main
    console.log('Opis pogody: ', data.weather[0].main)

    return data.weather[0].main
}
// link do ikonki, która odzwierciedla pogodę
function showIconCodeLink(data, query) {
    // document.querySelector(query).innerHTML = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
    console.log(`http://openweathermap.org/img/w/${data.weather[0].icon}.png`)

    return `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
}
function showMaxTemperature(data, query) {
    // document.querySelector(query).innerHTML = Math.round(data.main.temp_max)
    console.log('Max temperatura', Math.round(data.main.temp_max))
}
function showMinTemperature(data, query) {
    // document.querySelector(query).innerHTML = Math.round(data.main.temp_min)
    console.log('Min temperatura', Math.round(data.main.temp_min))
}

// na razie hard-coded, później miasto będzie się zmieniać,
// a funkcje show będą przyjmować query do konkretnych miejsc w HTML
getCurrentWeatherByCityName('London')
    .then(data => {
        showTemperature(data)
        showDescription(data)
        showIconCodeLink(data)
        showMaxTemperature(data)
        showMinTemperature(data)
        document.getElementById("today_weather_temperature").innerText = showTemperature(data) + "°C";
        actual_icon = document.getElementById("weather_icon");
        actual_icon.src = showIconCodeLink(data);
    })

    var header = document.getElementById("icon_bar");
    var btns = header.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
    

 function showTime(){
     var date = new Date();
     var h = date.getHours();
     var m = date.getMinutes();
     var s = date.getSeconds();
     var day = date.getDay();
     var month = date.getMonth() + 1;
     
     if(h<13){
         var hour = h;
         var day_or_night = ' am';
     }
     if(h>=12){
         var hour = h-12;
         var day_or_night = ' pm';
     }

     if(s<10){
         s = '0'+s;
     }
     if (m < 10) {
         m = '0' + m;
     }
     if (hour < 10) {
         hour = '0' + hour;
     }
     var time = hour + ":" + m + ":" + s + day_or_night;
     document.getElementById("myClock").innerText = time;
     document.getElementById("myClock").innerContent = time;

var objToday = new Date(),

    dayOfMonth = today + (objToday.getDate() < 10) ? '0' + objToday.getDate() : objToday.getDate(),
    months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
    curMonth = months[objToday.getMonth()]

var today = dayOfMonth + " " + curMonth;


    document.getElementById("today_is").innerHTML = today;
    document.getElementById("today_is_day_of_week").innerHTML = setDay(0);

     setTimeout(showTime, 1000)
 }   
 
 function setCity(city, country){
     document.getElementById("actual_city").innerText = city + ', ' + country;
    }

function setDay(offset){
    var objToday = new Date(),
    weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
    dayOfWeek = weekday[objToday.getDay()+offset];
    return dayOfWeek;
}
showTime();
setCity('London', 'England');

function showForecastTemperature(data, query) {
    // document.querySelector(query).innerHTML = Math.round(data.main.temp)
    days_min = new Array(5);
    days_max = new Array(5);
    days_icons = new Array(5);
    
    for(let i = 1; i<5; i++){
        days_min[i] = data.list[i].main.temp_min;
        days_max[i] = data.list[i].main.temp_max;
        days_icons[i] = data.list[i+3].weather[0].icon;

        for (let j = 0; j < 8; j++){
           // console.log('min temp z dnia ', i, " ", data.list[i+i*j].main.temp_max);
           
            if (data.list[i + i * j].main.temp_min < days_min[i]){
                days_min[i] = data.list[i + i * j].main.temp_min;
            }
            if (data.list[i + i * j].main.temp_max > days_max[i]){
                days_max[i] = data.list[i + i * j].main.temp_max;
            }
        }
        document.getElementsByClassName("next_day")[i-1].innerText = setDay(i);
        document.getElementsByClassName("next_day_temp")[i - 1].innerText = Math.round(days_min[i]) + '°c  ' + Math.round(days_max[i]) + '°c';
        //+ ' ' + Math.round(days_min[i]) + '°c  ' + Math.round(days_max[i]) + '°c'
    }
    for (let i = 1; i < 5; i++) {
        actual_icon = document.getElementsByClassName('forecast_weather_icon')[i-1];
        actual_icon.src = `http://openweathermap.org/img/w/${days_icons[i]}.png`
    }
    console.log(days_min);
    console.log(days_max);
    console.log(days_icons);
    console.log(data);
}


getForecastWeatherByCityName('London')
    .then(data => {
        showForecastTemperature(data);
    })
