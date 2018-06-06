import { Routes, RouterModule } from '@angular/router';

import { SinistersComponent } from './sinisters.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: SinistersComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
