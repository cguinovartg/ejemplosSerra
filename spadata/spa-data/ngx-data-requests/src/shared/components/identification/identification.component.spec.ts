import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificationComponent } from './identification.component';
import { SharedModule } from '../../shared.module';
import { ReactiveFormsModule, FormGroup, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { Component, ViewChild, Type, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NxCoreModule } from '@allianz/core';
import { UserService } from '../../services/user.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { By } from '@angular/platform-browser';
import { MockUserService } from '../../services/user.service.mock';

abstract class IdentificationComponentTest {
  @ViewChild(IdentificationComponent) identificationComponent: IdentificationComponent;
  onSubmit = jasmine.createSpy('onSubmitSpy');
  form: FormGroup;
}

@Component({
  template: `
  <form [formGroup]="form" (ngSubmit)="onSubmit(form)" >
  <app-sh-identification [typecode]="false" [code]="true" formGroupName="identificationForm"></app-sh-identification>
  </form>
  `
})
class SimpleIdentificationComponent extends IdentificationComponentTest implements OnInit {
  constructor( private fb: FormBuilder) {super(); }
  ngOnInit(): void {
   this.form = this.fb.group({
    identificationForm: this.fb.group({
      typeCode: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required]
    })
  });
  }
}

let fixture: ComponentFixture<IdentificationComponentTest>;
let testInstance: IdentificationComponentTest;
let codeField: DebugElement;
let typecodeField: DebugElement;
let identificationComponent: IdentificationComponent;

function createTestComponent(component: Type<IdentificationComponentTest>) {
  fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  testInstance = fixture.componentInstance;
  identificationComponent = testInstance.identificationComponent;
  codeField = fixture.debugElement.query(By.css('.nx-formfield__identification-code'));
  typecodeField = fixture.debugElement.query(By.css('.nx-formfield__identification-typeCode'));
}

describe('IdentificationComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleIdentificationComponent ],
      imports: [ ReactiveFormsModule, SharedModule, NxCoreModule.forRoot(), HttpClientModule],
      providers: [ FormBuilder, { provide: UserService, useClass: MockUserService } ],
      schemas: [  ]
    })
    .compileComponents();
  }));


  it('should create', () => {
    createTestComponent(SimpleIdentificationComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(testInstance).toBeTruthy();
    });
  });

  it('should have "typecode" hidden', () => {
    createTestComponent(SimpleIdentificationComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(typecodeField).toBeFalsy();
    });
  });
  it('should have "code" visible', () => {
    createTestComponent(SimpleIdentificationComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(codeField).toBeTruthy();
    });
  });
});
