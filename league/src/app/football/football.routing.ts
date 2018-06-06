import { Routes, RouterModule } from '@angular/router';
import { FootballComponent } from './football.component';
import { ModuleWithProviders } from '@angular/core';


export const routes: Routes = [
  {
  path: '',
  component: FootballComponent,
  children: [
    { path: 'classification', loadChildren:
      'app/football/classification/classification.module#ClassificationModule' },
    { path: 'team', loadChildren: 'app/football/team/team.module#TeamModule' }
]
}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
