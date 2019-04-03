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
    console.log(Math.round(data.main.temp))
}
// opis, np. Rain, Cloud itp. Niestety opisy czasem bywają długie
function showDescription(data, query) {
    // document.querySelector(query).innerHTML = data.main
    console.log(data.main)
}
// link do ikonki, która odzwierciedla pogodę
function showIconCodeLink(data, query) {
    // document.querySelector(query).innerHTML = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
    console.log(`http://openweathermap.org/img/w/${data.weather[0].icon}.png`)
}
function showMaxTemperature(data, query) {
    // document.querySelector(query).innerHTML = Math.round(data.main.temp_max)
    console.log(Math.round(data.main.temp_max))
}
function showMinTemperature(data, query) {
    // document.querySelector(query).innerHTML = Math.round(data.main.temp_min)
    console.log(Math.round(data.main.temp_min))
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
    })
