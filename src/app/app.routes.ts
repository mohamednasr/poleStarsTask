import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { ProfilesListComponent } from './components/profiles-list/profiles-list.component';

const routes: Route[] = [
  { path: '', component: ProfilesListComponent },
  { path: ':id', component: ProfileDetailsComponent, pathMatch: 'full' },
  { path: '**', component: AppComponent }
]
export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
