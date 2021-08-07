import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { Routes, RouterModule } from '@angular/router';
import { MatModule } from 'src/app/mat.module';
import { AddProductComponent } from './add-product/add-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  },
  {
    path: 'create',
    component: AddProductComponent
  }
]

@NgModule({
  declarations: [ProductComponent, AddProductComponent, DetailProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatModule
  ],
  entryComponents: [DetailProductComponent]
})
export class ProductModule { }
