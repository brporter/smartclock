import {Component} from 'angular2/core';
import {ClockComponent} from './clock.component'
import {CurrentWeatherComponent} from './weather.component'
import {ForecastPanelComponent} from './weather.component'

@Component({
    selector: 'smart-clock',
    template: `<h1>Welcome to SmartClock!</h1>
    <clock></clock>
    <currentWeather postalCode="63301"></currentWeather>
    <h1>Forecast:</h1>
    <forecast postalCode="63301"></forecast>
    `,
    directives: [ClockComponent, CurrentWeatherComponent, ForecastPanelComponent]
})
export class AppComponent {
}