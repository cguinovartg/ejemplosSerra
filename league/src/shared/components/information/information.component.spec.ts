import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationComponent } from './information.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('IdentificationComponent', () => {
  let component: InformationComponent;
  let fixture: ComponentFixture<InformationComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct name', () => {
    component.name = 'Title';
    fixture.detectChanges();
    const name = el.query(By.css('.app-name')).nativeElement.textContent;
    expect(name).toContain('Title');
  });
});
