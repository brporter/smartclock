export class RichDate {
    private _date: Date;

    constructor(d: Date) {
        if (d == null) {
            this._date = new Date()
        } else {
            this._date = d;
        }
    }

    toAmPmTimeString() {
        var amPm = this._date.getHours() > 12 ? 'PM' : 'AM';
        var mod = this._date.getHours() % 12;
        
        var minutes = this._date.getMinutes();
        var seconds = this._date.getSeconds();
        
        return (mod < 10 ? '0' + mod : mod) + ':' + (minutes< 10 ? '0' + minutes : minutes) + ':' + (seconds< 10 ? '0' + seconds : seconds) + ' ' + amPm;
    }
}