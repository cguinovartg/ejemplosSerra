import { NgModule } from '@angular/core';

import { routing } from './football.routing';
import { FootballComponent } from './football.component';
import { SharedModule } from '../../shared/shared.module';

import { NxCoreModule } from '@allianz/core';

@NgModule({
  imports: [
    routing,
    SharedModule,
    NxCoreModule
  ],
  declarations: [FootballComponent]
})
export class FootballModule { }
