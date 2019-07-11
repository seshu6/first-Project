import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardComponent } from './card/card.component';
import { VaultComponent } from './vault/vault.component';
import { BuyAndSellComponent } from './buy-and-sell/buy-and-sell.component';
import { CreateWalletComponent } from './create-wallet/create-wallet.component';
import { TwoStepsVerificationComponent } from './two-steps-verification/two-steps-verification.component';
import { PrivacyAndPoliciesComponent } from './privacy-and-policies/privacy-and-policies.component';
import { ApiDetailsComponent } from './api-details/api-details.component';
import { ApiTermsServicesComponent } from './api-terms-services/api-terms-services.component';
import { KycComponent } from './kyc/kyc.component';
import { ParentDashboardComponent } from './parent-dashboard/parent-dashboard.component';
import { HomeAddressComponent } from './home-address/home-address.component';

const routes: Routes = [{
  path: '',
  component: LandingPageComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'dashboard',
  component: ParentDashboardComponent,
  children: [{
    path: '', redirectTo: 'default-dashboard', pathMatch: 'full'
  }, {
    path: 'default-dashboard', component: DashboardComponent
  }, {
    path: 'kyc',
    component: KycComponent
  }, {
    path: 'homeaddress',
    component: HomeAddressComponent
  }]
}, {
  path: 'card',
  component: CardComponent
}, {
  path: 'vault',
  component: VaultComponent
}, {
  path: 'buyandsell',
  component: BuyAndSellComponent
}, {
  path: 'createwallet',
  component: CreateWalletComponent
}, {
  path: 'verification',
  component: TwoStepsVerificationComponent
}, {
  path: 'privacy',
  component: PrivacyAndPoliciesComponent
}, {
  path: 'api',
  component: ApiDetailsComponent
}, {
  path: 'termsandservices',
  component: ApiTermsServicesComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
