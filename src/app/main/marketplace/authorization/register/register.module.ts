import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule, Routes } from '@angular/router';
import { MatModule } from 'src/app/mat.module';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
  }
];

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatModule,
  ]
})
export class RegisterModule { }
