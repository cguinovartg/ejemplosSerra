// General Directorate of Security
import { Routes, RouterModule } from '@angular/router';

import { ClassificationComponent } from './classification.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ClassificationComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
