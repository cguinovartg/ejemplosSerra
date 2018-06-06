import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NxCoreModule } from '@allianz/core';
import {
  NxButtonModule,
  NxIconModule,
  NxDropdownModule,
  NxFormfieldModule,
  NxInputModule,
  NxGridModule,
  NxRadioToggleModule,
  NxHeadlineModule,
  NxRadioModule
} from '@allianz/ngx-ndbx';
import { NxEpacDatePickerModule } from '@allianz/epac';
import { OverlayModule } from '@angular/cdk/overlay';

import { InformationComponent } from './components/information/information.component';
import { ClassificationService } from './services/classification.service';

@NgModule({
  declarations: [ InformationComponent],
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
    NxEpacDatePickerModule,
    NxIconModule,
    NxCoreModule
  ],
  providers: [ClassificationService],
  exports: [InformationComponent]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
      return {
          ngModule: SharedModule
      };
  }
}
