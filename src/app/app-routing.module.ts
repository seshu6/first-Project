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

const routes: Routes = [{
  path: '',
  component: LandingPageComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'dashboard',
  component: DashboardComponent
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
},{
  path:'verification',
  component:TwoStepsVerificationComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
