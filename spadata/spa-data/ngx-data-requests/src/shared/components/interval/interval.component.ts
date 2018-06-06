import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { NxDatepickerLocaleObject } from '@allianz/epac/components/nx-epac-datepicker/datepicker-locale-object';
import { TranslateService } from '@allianz/core';

@Component({
  selector: 'app-sh-interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.scss']
})

export class IntervalComponent implements OnInit {

  @Input() typeDateSel: boolean; // true to show type date selection, false to hide
  @Input() annuity: boolean; // true to show annuity toggle, false to hide

  @Output() dateFromChange: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() dateToChange: EventEmitter<Date> = new EventEmitter<Date>();

  public trimesters: Array<Object>;
  public typeDate: Array<Object>;
  public infoCriterion: Array<Object>;
  public intervals: Array<Object>;
  public locale: NxDatepickerLocaleObject;

  constructor(
    public controlContainer: ControlContainer,
    public translate: TranslateService
  ) {
    this.typeDate = [
      {
        id: '0',
        title: 'Interval.EffectDate'
      },
      {
        id: '1',
        title: 'Interval.EmitDate'
      }
    ];
    this.infoCriterion = [
      {
        id: '0',
        title: 'Interval.Annuity'
      },
      {
        id: '1',
        title: 'Interval.Semester1'
      },
      {
        id: '2',
        title: 'Interval.Semester2'
      }
    ];
  }

  ngOnInit() {
    this.getDatepickerTranslations();
  }
  onDateFromPicked(event: Date) {
    this.dateFromChange.emit(event);
  }

  onDateToPicked(event: Date) {
    this.dateToChange.emit(event);
  }

  getDatepickerTranslations(): void {
    this.locale = {
      months3char: [],
      monthsFull: [],
      weekdays2char: [],
      weekdays3char: [],
      weekdaysFull: [],
      meridiemUppercase: [],
      meridiemLowercase: [],
      meridiemFull: [],
      title: '',
      dateFormat: ''
    };
    this.translate.get(['Datepicker'])
      .subscribe((res: any) => {
        this.locale.months3char = res.Datepicker.months3char;
        this.locale.monthsFull = res.Datepicker.monthsFull;
        this.locale.weekdays2char = res.Datepicker.weekdays2char;
        this.locale.weekdays3char = res.Datepicker.weekdays3char;
        this.locale.weekdaysFull = res.Datepicker.weekdaysFull;
        this.locale.meridiemUppercase = res.Datepicker.meridiemUppercase;
        this.locale.meridiemLowercase = res.Datepicker.meridiemLowercase;
        this.locale.meridiemFull = res.Datepicker.meridiemFull;
        this.locale.title = res.Datepicker.title;
        this.locale.dateFormat = res.Datepicker.dateFormat;
      });
  }
}
