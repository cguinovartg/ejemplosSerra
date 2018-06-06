import { Routes, RouterModule } from '@angular/router';

import { BreakdownComponent } from './breakdown.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: BreakdownComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
