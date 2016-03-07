import {bootstrap}      from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {WeatherService} from './weather.service'

Date.prototype.toAmPmTimeString = function() {
    var amPm = this.getHours() > 12 ? 'PM' : 'AM';
    var mod = this.getHours() % 12;
    
    var minutes = this.getMinutes();
    var seconds = this.getSeconds();
    
    return (mod < 10 ? '0' + mod : mod) + ':' + (minutes< 10 ? '0' + minutes : minutes) + ':' + (seconds< 10 ? '0' + seconds : seconds) + ' ' + amPm;
}

bootstrap(AppComponent, [WeatherService]);
