import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './breakdown.routing';
import { BreakdownComponent } from './breakdown.component';
import { SharedModule } from '../../../shared/shared.module';
import { NxCoreModule } from '@allianz/core';
import { NxButtonModule, NxMessageModule, NxGridModule } from '@allianz/ngx-ndbx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    SharedModule,
    NxCoreModule,
    NxButtonModule,
    NxMessageModule,
    NxGridModule
  ],
  declarations: [BreakdownComponent]
})
export class BreakdownModule { }
