import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/guard/auth-guard.service';
import { NotFoundComponent } from './shared/component/not-found/not-found.component';

const routes: Routes = [{
  path: 'videos',
  canMatch: [(route: any, url: any[]) => inject(AuthGuardService).canMatch(route, url)],
  loadChildren: () => import('./videos/videos.module').then(m => m.VideosModule)
}, 
{
  path: 'auth',
  canActivate: [(route: any, url: any[]) => inject(AuthGuardService).canActivate(route, url)],
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
},
{
  path: '',
  pathMatch: 'full',
  redirectTo: 'auth/login'
},
{
  path: '**', 
  component: NotFoundComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
