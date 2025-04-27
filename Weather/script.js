function getWeather() {
    let location = document.getElementById("location").value.trim();
    if (!location) {
        alert("Please enter a city name");
        return;
    }

    let apiKey = "5611c5f6ef9c432fa8a102633252103";
    let currentWeatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;
    let forecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5&aqi=no&alerts=no`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById("weather").innerHTML = `
                <h3>${data.location.name}, ${data.location.country}</h3>
                <p><strong>🌡️ Temperature:</strong> ${data.current.temp_c}°C</p>
                <p><strong>🌬️ Wind Speed:</strong> ${data.current.wind_kph} km/h</p>
                <p><strong>🌥️ Condition:</strong> ${data.current.condition.text}</p>
                <img src="${data.current.condition.icon}" alt="Weather Icon">
            `;
        })
        .catch(error => {
            document.getElementById("weather").innerHTML = "❌ Error fetching weather data";
            console.error("Error:", error);
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            let forecastHtml = `<h4>5-Day Forecast</h4>`;
            data.forecast.forecastday.forEach(day => {
                forecastHtml += `
                    <div class="forecast-item">
                        <p><strong>${day.date}</strong></p>
                        <p>🌡️ Temp: ${day.day.avgtemp_c}°C</p>
                        <p>🌥️ ${day.day.condition.text}</p>
                        <img src="${day.day.condition.icon}" alt="Weather Icon">
                    </div>
                `;
            });
            document.getElementById("forecast").innerHTML = forecastHtml;
        })
        .catch(error => {
            document.getElementById("forecast").innerHTML = "❌ Error fetching forecast data";
            console.error("Error:", error);
        });
}
