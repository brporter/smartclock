import {Component} from 'angular2/core';
import {ClockComponent} from './clock.component'
import {CurrentWeatherComponent} from './weather.component'
import {ForecastPanelComponent} from './weather.component'

@Component({
    selector: 'smart-clock',
    template: `
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8"><clock></clock></div>
            <div class="col-sm-4"><currentWeather postalCode="63301"></currentWeather></div>
        </div>
        <div class="row">
            <forecast postalCode="63301"></forecast>
        </div>
    </div>
    `,
    directives: [ClockComponent, CurrentWeatherComponent, ForecastPanelComponent]
})
export class AppComponent {
}