import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './pages/browse/browse/browse.component';
import { AuthComponent } from './core/components/auth/auth.component';
import { AuthGuard } from './core/services/auth.guard';

const routes: Routes = [{
  path: '', redirectTo: "/auth", pathMatch: 'full'
},
{
  path: "auth", component: AuthComponent,
  canActivate:[AuthGuard]
},
{
  path: "browse",
  component: BrowseComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
