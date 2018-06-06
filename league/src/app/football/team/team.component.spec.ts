import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { InformationComponent } from '../../../shared/components/information/information.component';
import { TeamComponent } from './team.component';
import { TeamService } from '../../../shared/services/team.service';

import {
    NxButtonModule,
    NxRadioToggleModule,
    NxInputModule,
    NxFormfieldModule,
    NxDropdownModule,
    NxGridModule,
    NxCheckboxModule,
    NxRadioModule,
    NxMessageModule
} from '@allianz/ngx-ndbx';

// Core
import { NxCoreModule } from '@allianz/core';

class MockTeamService {
    createTeam(team: any) {
        return Observable.of({success: true});
    }
}

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TeamComponent,
        InformationComponent
      ],
      imports: [
        NxCoreModule.forRoot(),
        FormsModule,
        HttpClientModule,
        NxButtonModule,
        NxFormfieldModule,
        NxDropdownModule,
        NxInputModule,
        NxGridModule,
        NxCheckboxModule,
        NxRadioModule,
        NxMessageModule
      ],
      providers: [
        {provide: TeamService, useClass: MockTeamService}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
