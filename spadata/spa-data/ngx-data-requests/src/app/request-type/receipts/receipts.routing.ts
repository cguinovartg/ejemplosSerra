import { Routes, RouterModule } from '@angular/router';

import { ReceiptsComponent } from './receipts.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ReceiptsComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
