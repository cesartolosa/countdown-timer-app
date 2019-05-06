import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'ctf-countdown-timer-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  endDateControl = new FormControl('', Validators.pattern('dddd-dd-ddTdd:dd:dd'));
  endDate$: Observable<Date> = this.endDateControl.valueChanges.pipe(
    tap(() => this.endDateReached = false),
    map(value => moment(value).toDate()), // moment used for cross-browser date compatibility
  );
  endDateReached: boolean;
}
