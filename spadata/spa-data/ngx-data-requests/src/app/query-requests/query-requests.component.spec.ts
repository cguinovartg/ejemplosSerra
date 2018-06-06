import { SharedModule } from '../../shared/shared.module';
import { MockUserService } from '../../shared/services/user.service.mock';
import { UserService } from '../../shared/services/user.service';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TestBed, async, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { NxCoreModule, NxPersistenceService, TranslateService } from '@allianz/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MockPersistenceService } from '../../shared/services/persistence.service.mock';
import { QueryRequestsComponent } from './query-requests.component';
import { NO_ERRORS_SCHEMA, EventEmitter } from '@angular/core';
import { DataRequestService } from '../../shared/services/data-request.service';
import { MockDataRequestService } from '../../shared/services/data-request.service.mock';
import { By } from '@angular/platform-browser';
import { NxEpacDataTableComponent } from '@allianz/epac';
import { Observable } from 'rxjs/Observable';

export class MockTranslateService {
  private _onTranslationChange: EventEmitter<any> = new EventEmitter<any>();
  private _onLangChange: EventEmitter<any> = new EventEmitter<any>();
  private _onDefaultLangChange: EventEmitter<any> = new EventEmitter<any>();

  get onTranslationChange(): EventEmitter<any> {
    return this._onTranslationChange;
  }

  get onLangChange(): EventEmitter<any> {
    return this._onLangChange;
  }

  get onDefaultLangChange() {
    return this._onDefaultLangChange;
  }

  public get(key: any): any {
    if (key[0] === 'QueryRequests') {
      return Observable.of({
        QueryRequests: {
          DataRequestColumns: {
            RequestNumber: 'Request Number',
            RequestDate: 'Request Date',
            RequestType: 'Request Type',
            State: 'State',
            Description: 'Description',
            User: 'User'
          }
        }
      });
    } else if (key[0] === 'Datepicker') {
      return Observable.of({
        Datepicker: {
          months3char: '',
          monthsFull: '',
          weekdays2char: '',
          weekdays3char: '',
          weekdaysFull: '',
          meridiemUppercase: '',
          meridiemLowercase: '',
          meridiemFull: '',
          title: '',
          dateFormat: ''
        }
      });
    } else {
      return Observable.of(key);
    }
  }
}

describe('QueryRequestsComponent', () => {
  let component: QueryRequestsComponent;
  let fixture: ComponentFixture<QueryRequestsComponent>;
  let table: any;
  let translateService: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryRequestsComponent ],
      imports: [
        ReactiveFormsModule,
        SharedModule,
        NxCoreModule.forRoot(
          undefined,
          undefined,
          undefined
        ),
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        FormBuilder,
        { provide: TranslateService, useClass: MockTranslateService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .overrideComponent(QueryRequestsComponent, {
      set: {
        providers: [
          { provide: UserService, useClass: MockUserService },
          { provide: DataRequestService , useClass: MockDataRequestService },
          { provide: NxPersistenceService, useClass: MockPersistenceService }
        ]
      }
    })
    .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(QueryRequestsComponent);
        component = fixture.componentInstance;
      });
      spyOn(sessionStorage, 'getItem').and.callFake(function (key) {
        return 'agente7';
      });
      translateService = TestBed.get(TranslateService);
  }));

  function updateForm(values) {
    component.form.controls['status'].setValue(values.status);
    component.form.controls['mediator'].setValue(values.mediator);
    component.form.controls['type'].setValue(values.type);
    component.form.controls['dateFrom'].setValue(values.dateFrom);
    component.form.controls['dateTo'].setValue(values.dateTo);
  }

  it('should create', fakeAsync(() => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('should not allow to search. Form is invalid', fakeAsync(() => {
    fixture.detectChanges();
    updateForm({status: '', mediator: '', type: '', dateFrom: '', dateTo: ''});
    expect(component.form.valid).toBeFalsy();
  }));

  it('should allow to search. Form is valid', fakeAsync(() => {
    fixture.detectChanges();
    updateForm({status: 'a', mediator: 'b', type: 'c', dateFrom: '2014-04-23T09:54:51', dateTo: '2014-04-23T09:54:51'});
    expect(component.form.valid).toBeTruthy();
  }));

  it('should call "getDataSearch" function from DataRequestService', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(component.dr, 'getDataSearch').and.callThrough();
    updateForm({status: 'a', mediator: 'b', type: 'c', dateFrom: '22/10/2010', dateTo: '22/10/2010'});
    component.onSubmit();

  }));

  it('should fill datatable with two rows', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(component.dr, 'getDataSearch').and.callThrough();
    updateForm({status: 'a', mediator: 'b', type: 'c', dateFrom: '22/10/2010', dateTo: '22/10/2010'});
    component.onSubmit();
    fixture.detectChanges();
    table = fixture.debugElement.query(By.css('.query-requests__epac-data-table'));
    expect(table.nativeNode.nxData.length).toEqual(2);
  }));
});
