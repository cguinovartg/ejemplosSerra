import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { routing } from './classification.routing';
import { ClassificationComponent } from './classification.component';
import { SharedModule } from '../../../shared/shared.module';

import { NxCoreModule } from '@allianz/core';
import {
  NxButtonModule,
  NxFormfieldModule,
  NxDropdownModule,
  NxInputModule,
  NxGridModule
} from '@allianz/ngx-ndbx';
import { NxEpacDataTableModule } from '@allianz/epac';

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
    NxEpacDataTableModule
  ],
  declarations: [ClassificationComponent]
})
export class ClassificationModule { }
