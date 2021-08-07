import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardSidenavComponent } from './dashboard-sidenav/dashboard-sidenav.component';
import { RouterModule } from '@angular/router';
import { MatModule } from 'src/app/mat.module';
import { DashboardFooterComponent } from './dashboard-footer/dashboard-footer.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';



@NgModule({
  declarations: [
    DashboardSidenavComponent,
    DashboardHeaderComponent,
    DashboardFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatModule
  ],
  exports: [
    DashboardSidenavComponent,
    DashboardHeaderComponent,
    DashboardFooterComponent
  ]
})
export class DashboardCommonModule { }
