import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherRequestComponent } from './other-request.component';

xdescribe('OtherRequestComponent', () => {
  let component: OtherRequestComponent;
  let fixture: ComponentFixture<OtherRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
