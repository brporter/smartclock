import {Component} from 'angular2/core';

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
        this.currentTime = new Date().toAmPmTimeString();
        setTimeout( () => this.updateTime(), 1000);
    }
}