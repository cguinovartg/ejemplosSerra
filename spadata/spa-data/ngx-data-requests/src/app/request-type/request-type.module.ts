import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './request-type.routing';

import { RequestTypeComponent } from './request-type.component';

import { SharedModule } from '../../shared/shared.module';
import { NxCoreModule } from '@allianz/core';

@NgModule({
  imports: [
    CommonModule, FormsModule, routing, SharedModule,
    NxCoreModule
  ],
  declarations: [RequestTypeComponent]
})
export class RequestTypeModule { }
