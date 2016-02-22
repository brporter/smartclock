import {Component} from 'angular2/core';

@Component({
    selector: 'clock',
    template: '<h1>{{currentTime}}</h1>'
})
export class ClockComponent {
    public currentTime : string = "";
    
    constructor() {
        this.updateTime();
    }
    
    private updateTime()
    {
        this.currentTime = new Date().toLocaleTimeString();
        setTimeout( () => this.updateTime(), 1000);
    }
}