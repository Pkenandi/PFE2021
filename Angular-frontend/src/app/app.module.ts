import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IvyCarouselModule} from 'angular-responsive-carousel';

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
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IvyCarouselModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AccountComponent,
    MedLoginComponent,
    MedRegisterComponent,
    PatRegisterComponent,
    PatLoginComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
