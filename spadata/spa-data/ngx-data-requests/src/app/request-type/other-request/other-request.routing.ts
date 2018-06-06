import { Routes, RouterModule } from '@angular/router';

import { OtherRequestComponent } from './other-request.component';
import { ModuleWithProviders } from '@angular/core';


export const routes: Routes = [
  {
    path: '',
    component: OtherRequestComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
