import { ViewChild, DebugElement, Component, OnInit, Type } from '@angular/core';
import { IntervalComponent } from './interval.component';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ComponentFixture, TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../../shared.module';
import { NxCoreModule } from '@allianz/core';
import { HttpClientModule } from '@angular/common/http';

abstract class IntervalComponentTest {
  @ViewChild(IntervalComponent) intervalComponent: IntervalComponent;
  onSubmit = jasmine.createSpy('onSubmitSpy');
  form: FormGroup;
}

@Component({
  template: `
  <form [formGroup]="form" (ngSubmit)="onSubmit(form)" >
  <app-sh-interval
    formGroupName="interval"
    (dateFromChange)="onDateFromChange($event)"
    (dateToChange)="onDateToChange($event)"
    [typeDateSel]="false"
    [annuity]="false">
  </app-sh-interval>
  </form>
  `
})
class HideInputFieldsComponent extends IntervalComponentTest implements OnInit {
  constructor(private fb: FormBuilder) { super(); }
  ngOnInit(): void {
    this.form = this.fb.group({
      interval: this.fb.group({
        interval: '',
        trimester: '',
        dateFrom: '01/01/2017',
        dateTo: '15/06/2017',
        typeDateSel: '0',
        fiscalYear: '',
        informationCriterion: ''
      })
    });
  }
}


@Component({
  template: `
  <form [formGroup]="form" (ngSubmit)="onSubmit(form)" >
  <app-sh-interval
    formGroupName="interval"
    (dateFromChange)="onDateFromChange($event)"
    (dateToChange)="onDateToChange($event)"
    [typeDateSel]="true"
    [annuity]="true">
  </app-sh-interval>
  </form>
  `
})
class SimpleIntervalComponent extends IntervalComponentTest implements OnInit {
  constructor(private fb: FormBuilder) { super(); }
  ngOnInit(): void {
    this.form = this.fb.group({
      interval: this.fb.group({
        interval: '',
        trimester: '',
        dateFrom: '01/01/2017',
        dateTo: '15/06/2017',
        typeDateSel: '0',
        fiscalYear: '2017',
        informationCriterion: '0'
      })
    });
  }
}

let fixture: ComponentFixture<IntervalComponentTest>;
let testInstance: IntervalComponentTest;
let intervalComponent: IntervalComponent;
let toggleDates: DebugElement;
let typeDate: DebugElement;
let infoCriterion: DebugElement;
let dateFromChangeField: DebugElement;
let dateToChangeField: DebugElement;

function createTestComponent(component: Type<IntervalComponentTest>) {
  fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  testInstance = fixture.componentInstance;
  intervalComponent = testInstance.intervalComponent;
  toggleDates = fixture.debugElement.query(By.css('.nx-formfield__interval-toggle-dates'));
  dateToChangeField = fixture.debugElement.query(By.css('.nx-formfield__identification-dateToChange'));
}

describe('IntervalComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleIntervalComponent, HideInputFieldsComponent],
      imports: [ReactiveFormsModule, SharedModule, NxCoreModule.forRoot(), HttpClientModule],
      providers: [FormBuilder],
      schemas: []
    })
      .compileComponents();
  }));

  it('should create', () => {
    createTestComponent(SimpleIntervalComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(testInstance).toBeTruthy();
    });
  });

  it('should have "typeDateSel" visible', fakeAsync(() => {
    createTestComponent(SimpleIntervalComponent);
    const el = toggleDates.nativeElement;
    const option = el.childNodes[0].children[1];
    option.children[0].click();
    fixture.detectChanges();
    tick(1000);
    typeDate = fixture.debugElement.query(By.css('.nx-formfield__interval-typeDate'));
    expect(typeDate).toBeTruthy();
  }));

  it('should have "annuity" visible', fakeAsync(() => {
    createTestComponent(SimpleIntervalComponent);
    const el = toggleDates.nativeElement;
    const option = el.childNodes[0].children[2];
    option.children[0].click();
    fixture.detectChanges();
    tick(1000);
    infoCriterion = fixture.debugElement.query(By.css('.nx-formfield__interval-infoCriterion'));
    expect(infoCriterion).toBeTruthy();
  }));

  it('should have "typeDateSel" hide', fakeAsync(() => {
    createTestComponent(HideInputFieldsComponent);
    fixture.detectChanges();
    typeDate = fixture.debugElement.query(By.css('.nx-formfield__interval-typeDate'));
    expect(typeDate).toBeFalsy();
  }));

  it('should have "annuity" hide', () => {
    createTestComponent(HideInputFieldsComponent);
    fixture.detectChanges();
    infoCriterion = fixture.debugElement.query(By.css('.nx-formfield__interval-infoCriterion'));
    expect(typeDate).toBeFalsy();
  });

  xit('should call the output when a date is selected', fakeAsync(() => {
    createTestComponent(SimpleIntervalComponent);
    const el = toggleDates.nativeElement;
    const option = el.childNodes[0].children[1];
    option.children[0].click();
    fixture.detectChanges();
    spyOn(fixture.componentInstance.intervalComponent.dateFromChange, 'emit').and.callThrough();
    tick(1000);
    dateFromChangeField = fixture.debugElement.query(By.css('.nx-formfield__identification-dateFrom'));
    const dateField = dateFromChangeField.nativeElement;
    dateField.value = '01/01/2018';
    expect(fixture.componentInstance.intervalComponent.dateFromChange.emit).toBe('01/01/2018');
  }));
});
