export class WeatherService {
    private _apiKey : string = "a6be23893b7fd3e6b53abcda72e8832f";
    private _units : string = "imperial";
    
    public getWeather(postalCode: string) : Promise<IWeatherReport>
    {
        return new Promise( (resolve, reject) => {
            var req = new XMLHttpRequest();
            req.open("GET", "http://api.openweathermap.org/data/2.5/weather?zip=" + postalCode + "&appid=" + this._apiKey + "&units=" + this._units);
            
            req.onload = () => {
                if (req.status >= 200 && req.status < 300)
                {
                    var weatherData = JSON.parse(req.responseText);

                    resolve({
                            "temperature": weatherData.main.temp,
                            "shortDescription": weatherData.weather[0].main,
                            "longDescription": weatherData.weather[0].description,
                            "pressure": weatherData.main.pressure,
                            "humidity": weatherData.main.humidity,
                            "windSpeed": weatherData.wind.speed,
                            "windDirection": weatherData.wind.deg,
                            "time": new Date()
                        });
                } else {
                    reject( {
                        "status": req.status,
                        "statusText": req.statusText
                    });
                }
            };
            
            req.send();
        } );
    }
    
    public getForecast(postalCode: string) : Promise<IWeatherReport[]>
    {
        return new Promise( (resolve, reject) => {
            var req = new XMLHttpRequest();
            req.open("GET", "http://api.openweathermap.org/data/2.5/forecast?zip=" + postalCode + "&appid=" + this._apiKey + "&units=" + this._units);
            
            req.onload = () => {
                if (req.status >= 200 && req.status < 300)
                {
                    var forecastData = JSON.parse(req.responseText);
                    var weatherResults : IWeatherReport[] = [];
                    
                    forecastData.list.forEach(forecast => {
                        weatherResults.push({
                            "temperature": forecast.main.temp,
                            "shortDescription": forecast.weather[0].main,
                            "longDescription": forecast.weather[0].description,
                            "pressure": forecast.main.pressure,
                            "humidity": forecast.main.humidity,
                            "windSpeed": forecast.wind.speed,
                            "windDirection": forecast.wind.deg,
                            "time": new Date(parseInt(forecast.dt) * 1000)
                        });
                    });
                    
                    resolve(weatherResults);
                } else {
                    reject({
                        "status": req.status,
                        "statusText": req.statusText
                    });
                }
            };
            
            req.send();
        });
    }
}

export interface IWeatherReport
{
    temperature : number;
    shortDescription : string;
    longDescription : string;
    pressure : number;
    windSpeed : number;
    windDirection : number;
    humidity: number;
    time: Date;
}