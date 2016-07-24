import {Component} from '@angular/core';
import {RichDate} from './RichDate';

@Component({
    selector: 'clock',
    template: '<h1 id="currentTime">{{currentTime}}</h1>'
})
export class ClockComponent {
    public currentTime : string = "";
    
    constructor() {
        this.updateTime();
    }
    
    private updateTime()
    {
        this.currentTime = new RichDate(null).toAmPmTimeString();
        setTimeout( () => this.updateTime(), 1000);
    }
}