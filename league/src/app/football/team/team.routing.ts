import { Routes, RouterModule } from '@angular/router';

import { TeamComponent } from './team.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: TeamComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
