import { PatDashboardComponent } from './users/patient/pat-dashboard/pat-dashboard.component';
import { MedDashboardComponent } from './users/medecin/med-dashboard/med-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AccountComponent } from './components/account/account.component';
import { PatLoginComponent } from './users/patient/pat-login/pat-login.component';
import { PatRegisterComponent } from './users/patient/pat-register/pat-register.component';
import { MedLoginComponent } from './users/medecin/med-login/med-login.component';
import { MedRegisterComponent } from './users/medecin/med-register/med-register.component';
import { DossierMedicalComponent } from './users/patient/dossier-medical/dossier-medical.component';
import { RendezVousComponent } from './components/rendez-vous/rendez-vous.component';
import { PatProfileComponent } from './users/patient/pat-profile/pat-profile.component';
import { MedProfileComponent } from './users/medecin/med-profile/med-profile.component';
import { NotificationComponent } from './notification/notification.component';
import { ChatComponent } from './components/chat/chat.component';
import {VideoComponent} from "./components/video/video.component";
import {PatLogoutComponent} from "./users/patient/pat-logout/pat-logout.component";
import {MedLogoutComponent} from "./users/medecin/med-logout/med-logout.component";
import {ListRendezvousComponent} from "./users/patient/list-rendezvous/list-rendezvous.component";
import {AgendaComponent} from "./users/medecin/agenda/agenda.component";
import {ProfileMedComponent} from "./users/patient/profile-med/profile-med.component";
import {ListRendezVousComponent} from "./users/medecin/list-rendez-vous/list-rendez-vous.component";
import {SmsComponent} from "./users/medecin/messagerie/sms/sms.component";
import {ListDossierComponent} from "./users/medecin/list-dossier/list-dossier.component";
import {ConfirmComponent} from "./components/confirm/confirm.component";
import {PatGuardGuard} from "./guard/patientGuard/pat-guard.guard";
import {MedGuardGuard} from "./guard/medecinGuard/med-guard.guard";


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
    canActivate: [PatGuardGuard]
  },
  {
    path: 'Med/:cin',
    component: ProfileMedComponent
  },
  {
    path: 'medecin/:cin',
    component: MedProfileComponent,
    canActivate: [MedGuardGuard]
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
    canActivate: [MedGuardGuard]
  },
  {
    path: 'med/agenda',
    component: AgendaComponent,
    canActivate: [MedGuardGuard]
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
    path: 'pat/logout',
    component: PatLogoutComponent
  },
  {
    path: 'med/logout',
    component: MedLogoutComponent
  },
  {
    path: 'pat/dashboard',
    component: PatDashboardComponent,
    canActivate: [PatGuardGuard]
  },
  {
    path: 'patient/dossier/:username',
    component: DossierMedicalComponent,
    canActivate: [PatGuardGuard]
  },
  {
    path: 'rendezVous',
    component: RendezVousComponent,
    canActivate: [PatGuardGuard]
  },
  {
    path: 'pat/listRdv',
    component: ListRendezvousComponent
  },
  {
    path: 'med/listRdv',
    component: ListRendezVousComponent,
    canActivate: [MedGuardGuard]
  },
  {
    path: 'notification',
    component: NotificationComponent,
  },
  {
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: 'consultation',
    component: VideoComponent,
    canActivate: [MedGuardGuard, PatGuardGuard]
  },
  {
    path: 'confirm',
    component: ConfirmComponent,
  },
  {
    path: 'sms',
    component: SmsComponent,
    canActivate: [MedGuardGuard]
  },
  {
    path: 'list',
    component: ListDossierComponent,
    canActivate: [MedGuardGuard]
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
