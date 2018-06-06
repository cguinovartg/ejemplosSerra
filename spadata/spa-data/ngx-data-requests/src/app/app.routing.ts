import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ErrorComponent } from '../shared/components/error/error.component';

export const routes: Routes = [
  { path: '', redirectTo: `request-type/general-directorate-security${window.location.search}`, pathMatch: 'full'},
  { path: 'request-type', loadChildren: 'app/request-type/request-type.module#RequestTypeModule' },
  { path: 'query-requests', loadChildren: 'app/query-requests/query-requests.module#QueryRequestsModule' },
  { path: 'error', component: ErrorComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
