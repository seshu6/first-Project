import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardComponent } from './card/card.component';
import { VaultComponent } from './vault/vault.component';
import { BuyAndSellComponent } from './buy-and-sell/buy-and-sell.component';

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
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
