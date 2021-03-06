import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './sinisters.routing';
import { SinistersComponent } from './sinisters.component';
import { SharedModule } from '../../../shared/shared.module';
import { NxCoreModule } from '@allianz/core';
import { NxButtonModule, NxFormfieldModule, NxDropdownModule, NxInputModule, NxGridModule, NxMessageModule } from '@allianz/ngx-ndbx';

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
  declarations: [SinistersComponent]
})
export class SinistersModule { }
