import {bootstrap}      from '@angular/platform-browser-dynamic';
import {AppComponent}   from './app.component';
import {WeatherService} from './weather.service';

bootstrap(AppComponent, [WeatherService]);
