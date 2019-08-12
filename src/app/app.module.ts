import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
import { TwoStepsVerificationComponent } from './two-steps-verification/two-steps-verification.component';
import { PrivacyAndPoliciesComponent } from './privacy-and-policies/privacy-and-policies.component';
import { ApiDetailsComponent } from './api-details/api-details.component';
import { ApiTermsServicesComponent } from './api-terms-services/api-terms-services.component';
import { ParentDashboardComponent } from './parent-dashboard/parent-dashboard.component';
import { KycComponent } from './kyc/kyc.component';
import { HomeAddressComponent } from './home-address/home-address.component';
import { SmsVerifyComponent } from './sms-verify/sms-verify.component';


// PACKAGES
import { NgxSpinnerModule } from 'ngx-spinner';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ChartsModule } from 'ng2-charts';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUserDetailsComponent } from './admin-user-details/admin-user-details.component';
import { AdminExchangeComponent } from './admin-exchange/admin-exchange.component';
import { AdminVaultHistoryComponent } from './admin-vault-history/admin-vault-history.component';
import { LoaderComponent } from './loader/loader.component';
import { AdminBuyAndSellComponent } from './admin-buy-and-sell/admin-buy-and-sell.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ActivationLinkComponent } from './activation-link/activation-link.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { KycViewComponent } from './kyc-view/kyc-view.component';
import { VaultHistoryComponent } from './vault-history/vault-history.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

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
    SmsVerifyComponent,
    AdminDashboardComponent,
    AdminUserDetailsComponent,
    AdminExchangeComponent,
    AdminVaultHistoryComponent,
    LoaderComponent,
    AdminBuyAndSellComponent,
    ForgotPasswordComponent,
    ActivationLinkComponent,
    OtpVerificationComponent,
    KycViewComponent,
    VaultHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ChartsModule,
    Ng2SearchPipeModule,
    PerfectScrollbarModule
  ],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
