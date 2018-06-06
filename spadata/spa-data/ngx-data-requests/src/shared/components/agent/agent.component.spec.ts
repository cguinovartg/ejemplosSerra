import { ViewChild, DebugElement, Type, Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AgentComponent } from './agent.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../../shared.module';
import { NxCoreModule } from '@allianz/core';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { Mediator } from '../../interfaces/mediator';

abstract class AgentComponentTest {
  @ViewChild(AgentComponent) agentComponent: AgentComponent;
  user: Mediator;
}

@Component({
  template: `
  <app-sh-agent [user]="user"></app-sh-agent>
  `
})
class SimpleAgentComponent extends AgentComponentTest implements OnInit {
  constructor() {
    super();
  }
  ngOnInit(): void {
    this.user = {
      agentNumber: '1234567',
      email: 'test@email.com',
      firstName: 'name',
      lastName: 'surname'
    };
  }
}

let fixture: ComponentFixture<AgentComponentTest>;
let testInstance: AgentComponentTest;
let agentComponent: AgentComponent;
let agentNumberField: DebugElement;
let nameField: DebugElement;
let emailField: DebugElement;

function createTestComponent(component: Type<AgentComponentTest>) {

  fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  testInstance = fixture.componentInstance;
  agentComponent = testInstance.agentComponent;

  agentNumberField = fixture.debugElement.query(By.css('.nx-formfield__agent-agentNumber'));
  nameField = fixture.debugElement.query(By.css('.nx-formfield__agent-name'));
  emailField = fixture.debugElement.query(By.css('.nx-formfield__agent-email'));
}

describe('AgentComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleAgentComponent],
      imports: [SharedModule, NxCoreModule.forRoot(), HttpClientModule],
      providers: [],
      schemas: []
    })
      .compileComponents();
  }));

  it('should create component', () => {
    createTestComponent(SimpleAgentComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(testInstance).toBeTruthy();
    });
  });

  it('should exist agentNumber value ', () => {
    createTestComponent(SimpleAgentComponent);
    const el = agentNumberField.nativeElement;
    fixture.detectChanges();
    expect(el.value).toBe('1234567');
  });

  it('should exist name value ', () => {
    createTestComponent(SimpleAgentComponent);
    const el = nameField.nativeElement;
    fixture.detectChanges();
    expect(el.value).toBe('surname, name');
  });

  it('agent number should exist', () => {
    createTestComponent(SimpleAgentComponent);
    const el = emailField.nativeElement;
    fixture.detectChanges();
    expect(el.value).toBe('test@email.com');
  });
});
