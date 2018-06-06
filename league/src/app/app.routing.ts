import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';


export const routes: Routes = [
  { path: '', redirectTo: `football/classification`, pathMatch: 'full'},
  { path: 'football', loadChildren: 'app/football/football.module#FootballModule', }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });
