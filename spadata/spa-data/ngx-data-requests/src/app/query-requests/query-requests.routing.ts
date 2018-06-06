import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { QueryRequestsComponent } from './query-requests.component';
import { QueryRequestDetailsComponent } from './details/query-request-details.component';

export const routes: Routes = [
  {
    path: '',
    component: QueryRequestsComponent
  },
  {
    path: ':petitionNumber/details',
    component: QueryRequestDetailsComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

