import {Component} from 'angular2/core';
import {Input} from 'angular2/core';
import {WeatherService} from './weather.service';
import {IWeatherReport} from './weather.service';

@Component({
    selector: 'currentWeather',
    template: `
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-5"><h1>{{report.temperature}}&nbsp;&deg;</h1></div>
                <div class="col-xs-7">
                    <p>{{report.shortDescription}}</p>
                    <p>{{report.pressure}}</p>
                    <p>Wind {{report.windDirection}} @ {{report.windSpeed}}MPH</p>
                </div>
            </div>
        </div>
    `,
})
export class CurrentWeatherComponent {
    @Input('postalCode') postalCode: string = "63301";

    public report: IWeatherReport = {
        "temperature": 0,
        "shortDescription": "",
        "longDescription": "",
        "pressure": 0,
        "humidity": 0,
        "windSpeed": 0,
        "windDirection": "",
        "time": new Date()
    };

    private _weatherService: WeatherService;

    constructor(weatherService: WeatherService) {
        this._weatherService = weatherService;

        this.refreshData();
    }

    private refreshData() {
        this._weatherService.getWeather(this.postalCode).then( (result) => this.report = result );
        setTimeout(() => { this.refreshData() }, 300000);
    }
}

@Component({
    selector: 'forecast',
    template: `
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-3" *ngFor="#forecastItem of forecast">
                    <h2>{{forecastItem.temperature}}&nbsp;&deg;</h2>
                    <p>{{forecastItem.shortDescription}}</p>
                    <p>Wind {{forecastItem.windDirection}} @ {{forecastItem.windSpeed}} MPH</p>
                    <p>{{forecastItem.time.toAmPmTimeString()}}</p>
                </div>
            </div>
        </div>
    `,
})
export class ForecastPanelComponent {
    @Input('postalCode') postalCode: string = "63301";
    
    public forecast: IWeatherReport[] = [];
    
    private _weatherService: WeatherService;
    
    constructor(weatherService: WeatherService) {
        this._weatherService = weatherService;
        
        this.refreshData();
    }
    
    private refreshData() {
        this._weatherService.getForecast(this.postalCode).then( (results) => this.forecast = results.slice(0, 7) );
        // this.forecast = [
        //     {
        //         'temperature': 67.0,
        //         'shortDescription': "Cloudy",
        //         "longDescription": "",
        //         'windSpeed': 4.56,
        //         'windDirection': this._weatherService.getCompassDirection(60),
        //         'time':new Date()
        //     },{
        //         'temperature': 67.0,
        //         'shortDescription': "Cloudy",
        //         'windSpeed': 4.56,
        //         'windDirection': this._weatherService.getCompassDirection(45),
        //         'time':new Date()
        //     },{
        //         'temperature': 67.0,
        //         'shortDescription': "Cloudy",
        //         'windSpeed': 4.56,
        //         'windDirection': this._weatherService.getCompassDirection(90),
        //         'time':new Date()
        //     },{
        //         'temperature': 67.0,
        //         'shortDescription': "Cloudy",
        //         'windSpeed': 4.56,
        //         'windDirection': this._weatherService.getCompassDirection(268),
        //         'time':new Date()
        //     },
        // ];

        setTimeout(() => { this.refreshData() }, 300000);
    }
}

