import { NxCoreModule } from '@allianz/core';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NxButtonModule, NxIconModule, NxDropdownModule, NxFormfieldModule, NxInputModule,
   NxGridModule, NxRadioToggleModule, NxHeadlineModule, NxRadioModule, NxMessageModule } from '@allianz/ngx-ndbx';
import { NxEpacDatePickerModule } from '@allianz/epac';
import { OverlayModule } from '@angular/cdk/overlay';
// Components
import { IntervalComponent } from './components/interval/interval.component';
import { IdentificationComponent } from './components/identification/identification.component';
import { PetitionComponent } from './components/petition/petition.component';
import { ErrorComponent } from './components/error/error.component';
import { AgentComponent } from './components/agent/agent.component';

// Providers
import { DataRequestService } from './services/data-request.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [AgentComponent, IdentificationComponent, IntervalComponent, PetitionComponent, ErrorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NxButtonModule,
    NxDropdownModule,
    NxFormfieldModule,
    OverlayModule,
    NxInputModule,
    NxGridModule,
    NxHeadlineModule,
    NxRadioModule,
    NxRadioToggleModule,
    NxIconModule,
    NxCoreModule,
    NxMessageModule,
    NxEpacDatePickerModule
  ],
  providers: [
    DataRequestService,
    UserService
  ],
  exports: [AgentComponent, IdentificationComponent, IntervalComponent, PetitionComponent, ErrorComponent]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
      return {
          ngModule: SharedModule
      };
  }
}
