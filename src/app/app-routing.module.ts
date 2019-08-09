import { NgModule } from '@angular/core';
import { UrlSegment, UrlSegmentGroup, Route } from '@angular/router';
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
import { SmsVerifyComponent } from './sms-verify/sms-verify.component';
import { AdminVaultHistoryComponent } from './admin-vault-history/admin-vault-history.component';
import { AdminUserDetailsComponent } from './admin-user-details/admin-user-details.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminBuyAndSellComponent } from './admin-buy-and-sell/admin-buy-and-sell.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ActivationLinkComponent } from './activation-link/activation-link.component';
import { ProfileComponent } from './profile/profile.component';
import { KycViewComponent } from './kyc-view/kyc-view.component';
import { VaultHistoryComponent } from './vault-history/vault-history.component';

const routes: Routes = [{
  path: '',
  component: LandingPageComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'profile',
  component: ProfileComponent
}, {
  path: 'dashboard',
  component: DashboardComponent
}, {
  path: 'kyc',
  component: KycComponent
}, {
  path: 'homeaddress',
  component: HomeAddressComponent
}, {
  path: 'verify',
  component: SmsVerifyComponent
}, {
  path: 'card',
  component: CardComponent
}, {
  path: 'vault',
  component: VaultComponent
},{
  path: 'vault-history',
  component: VaultHistoryComponent
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
}, {
  path: 'admin-vault',
  component: AdminVaultHistoryComponent
}, {
  path: 'admin-user-list',
  component: AdminUserDetailsComponent
}, {
  path: 'admin-dashboard',
  component: AdminDashboardComponent
}, {
  path: 'adminbuyandsell',
  component: AdminBuyAndSellComponent
},  {
  path: 'kyc-view',
  component: KycViewComponent
}, 
{
  path: '**',
  component: ActivationLinkComponent
}
  // {
  //   path: 'link/:email',
  //   component: ActivationLinkComponent
  // },
  //  {
  //   path: 'forgot/:id',
  //   component: ForgotPasswordComponent
  // },
  //  {
  //   matcher: ComplexUrlMatcher("id", /^[0-9!@#\$%\^\&*\)\(/]+$/g),
  //   component: ForgotPasswordComponent
  // }

];

// export function ComplexUrlMatcher(paramName: string, regex: RegExp) {
//   return (
//     segments: UrlSegment[],
//     segmentGroup: UrlSegmentGroup,
//     route: Route) => {

//     const parts = [regex];
//     const posParams: { [key: string]: UrlSegment } = {};
//     const consumed: UrlSegment[] = [];

//     let currentIndex = 0;

//     for (let i = 0; i < parts.length; ++i) {
//       if (currentIndex >= segments.length) {
//         return null;
//       }
//       const current = segments[currentIndex];

//       const part = parts[i];
//       if (!part.test(current.path)) {
//         return null;
//       }

//       posParams[paramName] = current;
//       consumed.push(current);
//       currentIndex++;
//     }

//     if (route.pathMatch === 'full' &&
//       (segmentGroup.hasChildren() || currentIndex < segments.length)) {
//       return null;
//     }

//     return { consumed, posParams };
//   }
// }


// {
//   path: 'dashboard',
//   component: ParentDashboardComponent,
//   children: [{
//     path: '', redirectTo: 'default-dashboard', pathMatch: 'full'
//   }, {
//     path: 'default-dashboard', component: DashboardComponent
//   }, {
//     path: 'kyc',
//     component: KycComponent
//   }, {
//     path: 'homeaddress',
//     component: HomeAddressComponent
//   }, {
//     path: 'verify',
//     component: SmsVerifyComponent
//   }]
// }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
