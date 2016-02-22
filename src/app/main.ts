import {bootstrap}      from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {WeatherService} from './weather.service'

bootstrap(AppComponent, [WeatherService]);
