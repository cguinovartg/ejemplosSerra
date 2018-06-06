import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { BreakdownComponent } from './breakdown.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../../shared/shared.module';
import { NxCoreModule } from '@allianz/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { MockUserService } from '../../../shared/services/user.service.mock';
import { NxPersistenceService } from '@allianz/core';
import { MockPersistenceService } from '../../../shared/services/persistence.service.mock';
import { DataRequestService } from '../../../shared/services/data-request.service';
import { MockDataRequestService } from '../../../shared/services/data-request.service.mock';
import { NxButtonModule, NxMessageModule } from '@allianz/ngx-ndbx';

describe('BreakdownComponent', () => {
  let component: BreakdownComponent;
  let fixture: ComponentFixture<BreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakdownComponent ],
      imports: [
        ReactiveFormsModule,
        SharedModule,
        NxCoreModule.forRoot(),
        HttpClientModule,
        RouterTestingModule,
        NxButtonModule,
        NxMessageModule
      ],
      providers: [
        FormBuilder
      ]
    })
    .overrideComponent(BreakdownComponent, {
      set: {
        providers: [
          { provide: UserService, useClass: MockUserService },
          { provide: NxPersistenceService, useClass: MockPersistenceService },
          { provide: DataRequestService, useClass: MockDataRequestService }

        ]
      }
    })
    .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(BreakdownComponent);
        component = fixture.componentInstance;
      });
      spyOn(sessionStorage, 'getItem').and.callFake(function (key) {
        return 'agente7';
      });
    }));

  function updateForm(identification, petition) {
    component.form.controls['identificationForm'].setValue(identification);
    component.form.controls['petitionForm'].setValue(petition);
  }

  it('should create', fakeAsync(() => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('Form Status is VALID. All required fields are filled.', fakeAsync(() => {
    fixture.detectChanges();
    updateForm({ code: 'cod', description: 'desc'}, { policyNumber: '12345', receiptNumber: '12345'});
    expect(component.form.status).toEqual('VALID');
  }));

  it('Form Status is INVALID. policyNumber or receiptNumber are not filled.', fakeAsync(() => {
    fixture.detectChanges();
    updateForm({ code: 'cod', description: 'desc'}, { policyNumber: '', receiptNumber: '12345' });
    expect(component.form.status).toEqual('INVALID');
    updateForm({ code: 'cod', description: 'desc'}, { policyNumber: '12345', receiptNumber: '' });
    expect(component.form.status).toEqual('INVALID');
    updateForm({ code: 'cod', description: 'desc'}, { policyNumber: '', receiptNumber: '' });
    expect(component.form.status).toEqual('INVALID');
  }));

});
