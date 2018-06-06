// General Directorate of Security
import { Routes, RouterModule } from '@angular/router';

import { GeneralDirectorateSecurityComponent } from './general-directorate-security.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: GeneralDirectorateSecurityComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
