import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './policies.routing';
import { PoliciesComponent } from './policies.component';
import { SharedModule } from '../../../shared/shared.module';
import { NxCoreModule } from '@allianz/core';
import { NxButtonModule, NxInputModule, NxFormfieldModule, NxDropdownModule, NxGridModule, NxMessageModule } from '@allianz/ngx-ndbx';

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
  declarations: [PoliciesComponent]
})
export class PoliciesModule { }
