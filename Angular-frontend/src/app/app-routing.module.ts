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
import { LogoutComponent } from './users/logout/logout.component';
import { DossierMedicalComponent } from './users/patient/dossier-medical/dossier-medical.component';
import { RendezVousComponent } from './users/patient/rendez-vous/rendez-vous.component';
import { ShowDossierContenteComponent } from './users/patient/show-dossier-contente/show-dossier-contente.component';
import { PatProfileComponent } from './users/patient/pat-profile/pat-profile.component';
import { MedProfileComponent } from './users/medecin/med-profile/med-profile.component';
import { NotificationComponent } from './notification/notification.component';
import { ChatComponent } from './users/chat/chat.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'mon-compte',
    component: AccountComponent
  },
  {
    path: 'patient/:username',
    component: PatProfileComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'medecin/:cin',
    component: MedProfileComponent,
    canActivate: [AuthGuard]
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
    component: MedDashboardComponent,
    canActivate: [AuthGuard]
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
    path: 'user/logout',
    component: LogoutComponent
  },
  {
    path: 'pat/dashboard',
    component: PatDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'patient/dossier/:username',
    component: DossierMedicalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pat/dossier/content',
    component: ShowDossierContenteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pat/rendezVous',
    component: RendezVousComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notification',
    component: NotificationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat',
    component: ChatComponent
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
