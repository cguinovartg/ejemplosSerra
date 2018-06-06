import { Routes, RouterModule } from '@angular/router';

import { PoliciesComponent } from './policies.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: PoliciesComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
