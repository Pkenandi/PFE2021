import { PatDashboardComponent } from './users/patient/pat-dashboard/pat-dashboard.component';
import { MedDashboardComponent } from './users/medecin/med-dashboard/med-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { PatLoginComponent } from './users/patient/pat-login/pat-login.component';
import { PatRegisterComponent } from './users/patient/pat-register/pat-register.component';
import { MedLoginComponent } from './users/medecin/med-login/med-login.component';
import { MedRegisterComponent } from './users/medecin/med-register/med-register.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'mon-compte',
    component: AccountComponent
  },
  {
    path: 'med/login',
    component: MedLoginComponent
  },
  {
    path: 'med/register',
    component: MedRegisterComponent
  },
  {
    path: 'med/dashboard',
    component: MedDashboardComponent
    //canActivate: [AuthGuard]
  },
  {
    path: 'pat/login',
    component: PatLoginComponent
  },
  {
    path: 'pat/register',
    component: PatRegisterComponent
  },
  {
    path: 'pat/dashboard',
    component: PatDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
