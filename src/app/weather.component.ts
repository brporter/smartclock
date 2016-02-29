import {Component} from 'angular2/core';
import {Input} from 'angular2/core';
import {WeatherService} from './weather.service';
import {IWeatherReport} from './weather.service';

@Component({
    selector: 'currentWeather',
    template: `
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-4"><h1>{{report.temperature}} &deg;</h1></div>
                <div class="col-xs-8">
                    <div class="container-fluid">
                        <div class="row"><div class="col-xs-12">{{report.shortDescription}}</div></div>
                        <div class="row"><div class="col-xs-12">{{report.pressure}}</div></div>
                        <div class="row"><div class="col-xs-12">{{report.windSpeed}} {{report.windDirection}}</div></div>
                    </div>
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
        "windDirection": 0,
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
        <div *ngFor="#forecastItem of forecast">
            <h2>{{forecastItem.temperature}} @ {{forecastItem.time.toLocaleTimeString()}}</h2>
            <h3>{{forecastItem.humidity}} %</h3>
            <h3>{{forecastItem.shortDescription}}</h3>
            <h4>{{forecastItem.longDescription}}</h4>
            <h4>{{forecastItem.pressure}}</h4>
            <h4>{{forecastItem.windSpeed}}</h4>
            <h4>{{forecastItem.windDirection}}</h4>
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
        this._weatherService.getForecast(this.postalCode).then( (results) => this.forecast = results );
        setTimeout(() => { this.refreshData() }, 300000);
    }
}

