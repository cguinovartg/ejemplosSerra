import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { PoliciesComponent } from './policies.component';
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
import { NxFormfieldComponent, NxDropdownComponent } from '@allianz/ngx-ndbx';
import { NxButtonModule, NxFormfieldModule, NxDropdownModule, NxInputModule, NxGridModule, NxMessageModule } from '@allianz/ngx-ndbx';
import { MockDataRequestService } from '../../../shared/services/data-request.service.mock';
import { DataRequestService } from '../../../shared/services/data-request.service';

describe('PoliciesComponent', () => {
  let component: PoliciesComponent;
  let fixture: ComponentFixture<PoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliciesComponent ],
      imports: [ReactiveFormsModule,
                SharedModule,
                NxCoreModule.forRoot(),
                HttpClientModule,
                RouterTestingModule,
                NxButtonModule,
                NxFormfieldModule,
                NxDropdownModule,
                NxInputModule,
                NxGridModule,
                NxMessageModule ],
      providers: [
        FormBuilder
      ]
    })
    .overrideComponent(PoliciesComponent, {
      set: {
        providers: [
          { provide: UserService, useClass: MockUserService },
          { provide: NxPersistenceService, useClass: MockPersistenceService},
          { provide: DataRequestService, useClass: MockDataRequestService }
        ]
      }
    })
    .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PoliciesComponent);
        component = fixture.componentInstance;
      });
      spyOn(sessionStorage, 'getItem').and.callFake(function (key) {
        return 'agente7';
      });
    }));

  function updateForm(identification, content, interval) {
    component.form.controls['identificationForm'].setValue(identification);
    component.form.controls['content'].setValue(content);
    component.form.controls['interval'].setValue(interval);
  }

  it('should create', fakeAsync(() => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('Form Status is VALID.', fakeAsync(() => {
    fixture.detectChanges();
    updateForm({typeCode: '1', description: 'TODOS'},
        { data: 'Content.Data.PolicyWallet', products: 'Content.Products.All', policyNumber: '693665599', format: 'Content.Format.Pdf' },
        { interval: 'Interval.Trimester', trimester: 'Interval.1', dateFrom: '', dateTo: '', typeDateSel: '' }
    );
    expect(component.form.status).toEqual('VALID');
  }));

  it('Form Status is INVALID.', fakeAsync(() => {
    fixture.detectChanges();
    updateForm({typeCode: '1', description: 'desc'},
        { data: '', products: 'Content.Products.Policy', policyNumber: '693665599', format: 'Content.Format.Pdf' },
        { interval: '', trimester: '', dateFrom: '', dateTo: '', typeDateSel: '' }
    );
    console.log('hello');
    expect(component.form.status).toEqual('INVALID');
  }));

  it ('should validate combo products (no empty)', fakeAsync(() => {
    fixture.detectChanges();
    expect(fixture.componentInstance.data).toBeTruthy();
    expect(fixture.componentInstance.products).toBeTruthy();
    expect(fixture.componentInstance.formats).toBeTruthy();
  }));

});
