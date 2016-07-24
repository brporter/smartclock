import {RichDate} from './RichDate';

export class WeatherService {
    private _apiKey : string = "a6be23893b7fd3e6b53abcda72e8832f";
    private _units : string = "imperial";
    
    public getCompassDirection(degree: number) : string
    {
        if (degree > 360 || degree < 0)
        {
            throw "degree must be less than 360 and more than 0";
        }
        
        if (degree == 0 || degree == 360)
        {
            return "N";
        }
        else if (degree > 270 && degree < 360)
        {
            return "NW";
        } 
        else if (degree > 0 && degree < 90)
        {
            return "NE";
        }
        else if (degree == 90) 
        {
            return "E";
        } 
        else if (degree == 180) 
        {
            return "S";
        } 
        else if (degree > 90 && degree < 180)
        {
            return "SE";
        }
        else if (degree > 180 && degree < 270)
        {
            return "SW";
        }
        else if (degree == 270) 
        {
            return "W";
        }
        
        throw "Unable to determine degree."
    }
    
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
                            "windDirection": this.getCompassDirection(weatherData.wind.deg),
                            "time": new RichDate(null)
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
                            "windDirection": this.getCompassDirection(forecast.wind.deg),
                            "time": new RichDate(new Date(parseInt(forecast.dt) * 1000))
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
    windDirection : string;
    humidity: number;
    time: RichDate;
}