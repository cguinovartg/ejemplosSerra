import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from './team.routing';
import { TeamComponent } from './team.component';
import { TeamService } from '../../../shared/services/team.service';
import { SharedModule } from '../../../shared/shared.module';

import { NxCoreModule } from '@allianz/core';

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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    SharedModule,
    NxCoreModule,
    NxButtonModule,
    NxFormfieldModule,
    NxDropdownModule,
    NxInputModule,
    NxGridModule,
    NxCheckboxModule,
    NxRadioModule,
    NxMessageModule
  ],
  declarations: [TeamComponent],
  providers: [
    TeamService
  ]
})
export class TeamModule { }
