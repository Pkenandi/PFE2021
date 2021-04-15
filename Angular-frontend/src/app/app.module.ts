import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { ToastrModule } from 'ngx-toastr';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from './home/home.component';
import {AccountComponent} from './account/account.component';
import {MedLoginComponent} from './users/medecin/med-login/med-login.component';
import {MedRegisterComponent} from './users/medecin/med-register/med-register.component';
import {PatRegisterComponent} from './users/patient/pat-register/pat-register.component';
import {PatLoginComponent} from './users/patient/pat-login/pat-login.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { PatDashboardComponent } from './users/patient/pat-dashboard/pat-dashboard.component';
import { MedDashboardComponent } from './users/medecin/med-dashboard/med-dashboard.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CardComponent } from './card/card.component';
import { LogoutComponent } from './users/logout/logout.component';
import { DossierMedicalComponent } from './users/patient/dossier-medical/dossier-medical.component';
import { RendezVousComponent } from './users/patient/rendez-vous/rendez-vous.component';
import { ShowDossierContenteComponent } from './users/patient/show-dossier-contente/show-dossier-contente.component';
import { PatProfileComponent } from './users/patient/pat-profile/pat-profile.component';
import { MedProfileComponent } from './users/medecin/med-profile/med-profile.component';
import { UserService } from './Services/user.service';
import { MedecinService } from './Services/medecin.service';
import { PatientService } from './Services/patient.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NotificationComponent } from './notification/notification.component';
import { ChatComponent } from './users/chat/chat.component';
import { VideoComponent } from './users/video/video.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import { MedLogoutComponent } from './users/medecin/med-logout/med-logout.component';
import { PatLogoutComponent } from './users/patient/pat-logout/pat-logout.component';

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
    ShowDossierContenteComponent,
    PatProfileComponent,
    MedProfileComponent,
    NotificationComponent,
    ChatComponent,
    VideoComponent,
    MedLogoutComponent,
    PatLogoutComponent
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
    ToastrModule.forRoot(),
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
    BrowserAnimationsModule
  ],

  providers: [UserService, MedecinService, PatientService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
