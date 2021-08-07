import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/mat.module';
import { Routes, RouterModule } from '@angular/router';
import { SubCategoryComponent } from './sub-category.component';
import { AddSubCategoryComponent } from './add-sub-category/add-sub-category.component';


const routes: Routes = [
  {
    path: '',
    component: SubCategoryComponent
  }
];

@NgModule({
  declarations: [SubCategoryComponent, AddSubCategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatModule
  ],
  entryComponents: [AddSubCategoryComponent]
})
export class SubCategoryModule { }
