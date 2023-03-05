import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

 import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {  Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
const moment = _moment;

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM',
  },
  display: {
    dateInput: 'YYYY-MM', // this is the format showing on the input element
    monthYearLabel: 'YYYY MM', // this is showing on the calendar
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY MM',
  },
};
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    DatePipe,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DatePickerComponent implements OnInit {
  date = new FormControl(moment());

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {}

  dateValue() {
    console.log(this.datePipe.transform(this.date.value, 'YYYY-MM'));
  }
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
}
