import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

import { routing } from './query-requests.routing';
import { QueryRequestsComponent } from './query-requests.component';
import { QueryRequestDetailsComponent } from './details/query-request-details.component';

import { NxEpacDataTableModule } from '@allianz/epac';
import { NxEpacDatePickerModule } from '@allianz/epac';

import { SharedModule } from '../../shared/shared.module';
import { NxFormfieldModule } from '@allianz/ngx-ndbx';
import { NxMessageModule } from '@allianz/ngx-ndbx';
import { NxDropdownModule } from '@allianz/ngx-ndbx';
import { NxButtonModule, NxGridModule } from '@allianz/ngx-ndbx';
import { NxInputModule } from '@allianz/ngx-ndbx';
import { NxHeadlineModule } from '@allianz/ngx-ndbx';
import { NxIconModule } from '@allianz/ngx-ndbx';
import { NxLinkModule } from '@allianz/ngx-ndbx';
import { NxCoreModule } from '@allianz/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    OverlayModule,
    NxCoreModule,
    SharedModule,
    ReactiveFormsModule,
    NxEpacDataTableModule,
    NxIconModule,
    NxHeadlineModule,
    NxInputModule,
    NxButtonModule,
    NxGridModule,
    NxMessageModule,
    NxFormfieldModule,
    NxDropdownModule,
    NxLinkModule,
    NxEpacDatePickerModule
  ],
  declarations: [
    QueryRequestsComponent,
    QueryRequestDetailsComponent
  ]
})
export class QueryRequestsModule { }
