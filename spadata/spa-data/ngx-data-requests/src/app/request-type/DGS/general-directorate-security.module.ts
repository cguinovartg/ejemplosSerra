// General Directorate of Security
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { routing } from './general-directorate-security.routing';
import { GeneralDirectorateSecurityComponent } from './general-directorate-security.component';

import { SharedModule } from '../../../shared/shared.module';
import { NxCoreModule } from '@allianz/core';
import {
  NxButtonModule,
  NxFormfieldModule,
  NxDropdownModule,
  NxInputModule,
  NxGridModule,
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
    NxMessageModule
  ],
  declarations: [GeneralDirectorateSecurityComponent]
})
export class GeneralDirectorateSecurityModule { }
