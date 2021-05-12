import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule} from "@angular/common";
import { NgbModalModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { FlatpickrModule} from "angularx-flatpickr";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {AccountComponent} from './components/account/account.component';
import {MedLoginComponent} from './users/medecin/med-login/med-login.component';
import {MedRegisterComponent} from './users/medecin/med-register/med-register.component';
import {PatRegisterComponent} from './users/patient/pat-register/pat-register.component';
import {PatLoginComponent} from './users/patient/pat-login/pat-login.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { PatDashboardComponent } from './users/patient/pat-dashboard/pat-dashboard.component';
import { MedDashboardComponent } from './users/medecin/med-dashboard/med-dashboard.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CardComponent } from './components/card/card.component';
import { LogoutComponent } from './users/logout/logout.component';
import { DossierMedicalComponent } from './users/patient/dossier-medical/dossier-medical.component';
import { RendezVousComponent } from './components/rendez-vous/rendez-vous.component';
import { PatProfileComponent } from './users/patient/pat-profile/pat-profile.component';
import { MedProfileComponent } from './users/medecin/med-profile/med-profile.component';
import { UserService } from './Services/userService/user.service';
import { MedecinService } from './Services/medecinService/medecin.service';
import { PatientService } from './Services/patientservice/patient.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NotificationComponent } from './notification/notification.component';
import { ChatComponent } from './components/chat/chat.component';
import { VideoComponent } from './components/video/video.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import { MedLogoutComponent } from './users/medecin/med-logout/med-logout.component';
import { PatLogoutComponent } from './users/patient/pat-logout/pat-logout.component';
import { ListRendezvousComponent } from './users/patient/list-rendezvous/list-rendezvous.component';
import { MatTabsModule } from "@angular/material/tabs";
import { AgendaComponent } from './users/medecin/agenda/agenda.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from "@angular/material/dialog";
import {
  ScheduleModule,
  RecurrenceEditorModule,
  DayService,
  WeekService,
  MonthService,
  WorkWeekService,
  MonthAgendaService
} from "@syncfusion/ej2-angular-schedule";
import {
  CalendarModule, DateAdapter
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ProfileMedComponent } from './users/patient/profile-med/profile-med.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {MatIconModule} from '@angular/material/icon'
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import { ListRendezVousComponent } from './users/medecin/list-rendez-vous/list-rendez-vous.component';
import { PatNotifComponent } from './users/patient/pat-notif/pat-notif.component';
import { MailComponent } from './users/medecin/messagerie/mail/mail.component';
import { SmsComponent } from './users/medecin/messagerie/sms/sms.component';
import {MatSelectModule} from "@angular/material/select";
import {MatCard, MatCardModule} from "@angular/material/card";
import { MedNotifComponent } from './users/medecin/med-notif/med-notif.component';
import { ListDossierComponent } from './users/medecin/list-dossier/list-dossier.component';
import { ListRdvComponent } from './users/medecin/list-rdv/list-rdv.component';
import { SpecialiteComponent } from './users/medecin/specialite/specialite.component';
import { TacheComponent } from './users/medecin/tache/tache.component';
import { ConfirmComponent } from './components/confirm/confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AccountComponent,
    MedLoginComponent,
    MedRegisterComponent,
    PatRegisterComponent,
    PatLoginComponent,
    PatDashboardComponent,
    MedDashboardComponent,
    SearchBarComponent,
    CardComponent,
    LogoutComponent,
    DossierMedicalComponent,
    RendezVousComponent,
    PatProfileComponent,
    MedProfileComponent,
    NotificationComponent,
    ChatComponent,
    VideoComponent,
    MedLogoutComponent,
    PatLogoutComponent,
    ListRendezvousComponent,
    AgendaComponent,
    ProfileMedComponent,
    ListRendezVousComponent,
    PatNotifComponent,
    MailComponent,
    SmsComponent,
    MedNotifComponent,
    ListDossierComponent,
    ListRdvComponent,
    SpecialiteComponent,
    TacheComponent,
    ConfirmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IvyCarouselModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatGridListModule,
    MatTabsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatBadgeModule,
    ToastrModule.forRoot(),
    ScheduleModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    CommonModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    NgxMaterialTimepickerModule,
    MatCardModule,
    NgbModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AccountComponent,
    MedLoginComponent,
    MedRegisterComponent,
    PatRegisterComponent,
    PatLoginComponent,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaterialTimepickerModule,
    MatBadgeModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
  ],

  providers: [
    UserService,
    MedecinService,
    PatientService,
    DayService,
    WeekService,
    MonthService,
    WorkWeekService,
    MonthAgendaService,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [PatNotifComponent,SmsComponent,MailComponent,MedNotifComponent,TacheComponent,ConfirmComponent]
})
export class AppModule {
}
