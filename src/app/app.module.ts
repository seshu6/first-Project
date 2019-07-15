import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { CardComponent } from './card/card.component';
import { VaultComponent } from './vault/vault.component';
import { BuyAndSellComponent } from './buy-and-sell/buy-and-sell.component';
import { CreateWalletComponent } from './create-wallet/create-wallet.component';


// PACKAGES
import { NgxSpinnerModule } from 'ngx-spinner';
import { TwoStepsVerificationComponent } from './two-steps-verification/two-steps-verification.component';
import { PrivacyAndPoliciesComponent } from './privacy-and-policies/privacy-and-policies.component';
import { ApiDetailsComponent } from './api-details/api-details.component';
import { ApiTermsServicesComponent } from './api-terms-services/api-terms-services.component';
import { ParentDashboardComponent } from './parent-dashboard/parent-dashboard.component';
import { KycComponent } from './kyc/kyc.component';
import { HomeAddressComponent } from './home-address/home-address.component';
import { SmsVerifyComponent } from './sms-verify/sms-verify.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingPageComponent,
    SidebarComponent,
    DashboardComponent,
    ProfileComponent,
    CardComponent,
    VaultComponent,
    BuyAndSellComponent,
    CreateWalletComponent,
    TwoStepsVerificationComponent,
    PrivacyAndPoliciesComponent,
    ApiDetailsComponent,
    ApiTermsServicesComponent,
    ParentDashboardComponent,
    KycComponent,
    HomeAddressComponent,
    SmsVerifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
