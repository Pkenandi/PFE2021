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
import { DossierMedicalComponent } from './users/patient/dossier-medical/dossier-medical.component';
import { RendezVousComponent } from './users/rendez-vous/rendez-vous.component';
import { PatProfileComponent } from './users/patient/pat-profile/pat-profile.component';
import { MedProfileComponent } from './users/medecin/med-profile/med-profile.component';
import { NotificationComponent } from './notification/notification.component';
import { ChatComponent } from './users/chat/chat.component';
import {VideoComponent} from "./users/video/video.component";
import {PatLogoutComponent} from "./users/patient/pat-logout/pat-logout.component";
import {MedLogoutComponent} from "./users/medecin/med-logout/med-logout.component";
import {ListRendezvousComponent} from "./users/patient/list-rendezvous/list-rendezvous.component";
import {AgendaComponent} from "./users/medecin/agenda/agenda.component";
import {ProfileMedComponent} from "./users/patient/profile-med/profile-med.component";
import {ShowDossierContenteComponent} from "./users/patient/show-dossier-contente/show-dossier-contente.component";
import {ListRendezVousComponent} from "./users/medecin/list-rendez-vous/list-rendez-vous.component";
import {MailComponent} from "./users/medecin/messagerie/mail/mail.component";
import {SmsComponent} from "./users/medecin/messagerie/sms/sms.component";


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
    path: 'Med/:cin',
    component: ProfileMedComponent
  },
  {
    path: 'medecin/:cin',
    component: MedProfileComponent,
   //canActivate: [AuthGuard]
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
    //canActivate: [AuthGuard]
  },
  {
    path: 'med/agenda',
    component: AgendaComponent
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
    //canActivate: [AuthGuard]
  },
  {
    path: 'patient/dossier/:username',
    component: DossierMedicalComponent,
   // canActivate: [AuthGuard]
  },
  {
    path: 'rendezVous',
    component: RendezVousComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'pat/listRdv',
    component: ListRendezvousComponent
  },
  {
    path: 'med/listRdv',
    component: ListRendezVousComponent
  },
  {
    path: 'notification',
    component: NotificationComponent,
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'consultation',
    component: VideoComponent
  },
  {
    path: 'mail',
    component: MailComponent,
  },
  {
    path: 'sms',
    component: SmsComponent
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
