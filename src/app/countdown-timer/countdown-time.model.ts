import { DAY, HOUR, MINUTE, SECOND } from './time-units-in-milliseconds';

export class CountdownTime {

    days: number = 0;
    hours: number = 0;
    minutes: number = 0;
    seconds: number = 0;
    endTimeReached: boolean = false;

    constructor(endTime?: number) {
        if (endTime) {
            let diff = endTime - Date.now() + SECOND;
            this.days = Math.floor(diff / DAY);
            diff -= this.days * DAY;
            this.hours = Math.floor(diff / HOUR);
            diff -= this.hours * HOUR;
            this.minutes = Math.floor(diff / MINUTE);
            diff -= this.minutes * MINUTE;
            this.seconds = Math.floor(diff / SECOND);
            this.endTimeReached = !(this.days || this.hours || this.minutes || this.seconds);
        }
    }

}