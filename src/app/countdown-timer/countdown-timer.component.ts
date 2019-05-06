import { Component, Input, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription, timer } from 'rxjs';

import { CountdownTime } from './countdown-time.model';
import { SECOND } from './time-units-in-milliseconds';

@Component({
  selector: 'ctf-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css'],
  host: {
    class: 'ctf-countdown-timer',
  },
})
export class CountdownTimerComponent implements OnChanges, OnDestroy {

  @Input() endDate: Date;
  @Output() endDateReached = new EventEmitter<void>()
  time = new CountdownTime();
  timeUnits = ['days', 'hours', 'minutes', 'seconds'];

  private endTime: number;
  private started: Subscription;

  ngOnChanges() {
    this.started && this.stop();
    this.initEndTime();
    if (this.isValidEndTime()) {
      this.start();
    } else {
      this.setDefaultTime();
    }
  }

  ngOnDestroy() {
    this.stop();
  }

  private initEndTime() {
    this.endTime = this.endDate && this.endDate.getTime();
  }

  private isValidEndTime() {
    return !isNaN(this.endTime) && this.endTime > Date.now();
  }

  private start() {
    this.started = timer(Date.now() % SECOND, SECOND).subscribe(() => {
      this.time = new CountdownTime(this.endTime);
      if (this.time.endTimeReached) {
        this.endDateReached.emit();
        this.stop();
      }
    });
  }

  private stop() {
    this.started.unsubscribe();
  }

  private setDefaultTime() {
    this.time = new CountdownTime();
  }

}
