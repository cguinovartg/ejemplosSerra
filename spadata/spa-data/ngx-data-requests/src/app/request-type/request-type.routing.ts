import { Routes, RouterModule } from '@angular/router';
import { RequestTypeComponent } from './request-type.component';
import { ModuleWithProviders } from '@angular/core';


export const routes: Routes = [
  {
  path: '',
  component: RequestTypeComponent,
  children: [
    { path: 'general-directorate-security', loadChildren:
      'app/request-type/DGS/general-directorate-security.module#GeneralDirectorateSecurityModule' },
    { path: 'policies', loadChildren: 'app/request-type/policies/policies.module#PoliciesModule' },
    { path: 'receipts', loadChildren: 'app/request-type/receipts/receipts.module#ReceiptsModule' },
    { path: 'sinisters', loadChildren: 'app/request-type/sinisters/sinisters.module#SinistersModule' },
    { path: 'breakdown', loadChildren: 'app/request-type/breakdown/breakdown.module#BreakdownModule' },
    { path: 'other-request', loadChildren: 'app/request-type/other-request/other-request.module#OtherRequestModule' },
  ]
}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
