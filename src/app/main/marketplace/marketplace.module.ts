import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MarketplaceComponent } from './marketplace.component';
import { MarketplaceCommonModule } from './common/marketplace-common.module';

const routes: Routes = [
  {
    path: '',
    component: MarketplaceComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./homepage/homepage.module').then(mod => mod.HomepageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./authorization/register/register.module').then(mod => mod.RegisterModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./authorization/login/login.module').then(mod => mod.LoginModule)
      },
    ]
  },
  {
    path: '',
    loadChildren: () => import('../dashboard/dashboard.module').then(mod => mod.DashboardModule)
  },
];

@NgModule({
  declarations: [MarketplaceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MarketplaceCommonModule
  ]
})
export class MarketplaceModule { }
