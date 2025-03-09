import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'user-weather',
    loadChildren: () => import('./pages/user-weather/user-weather.module').then(m => m.UserWeatherModule)
  },
  {
    path: 'saved-users',
    loadChildren: () => import('./pages/saved-users/saved-users.module').then(m => m.SavedUsersModule)
  },
  { path: '', redirectTo: '/user-weather', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }