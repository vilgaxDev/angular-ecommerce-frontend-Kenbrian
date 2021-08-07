import { Component, OnInit, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ApiCommonService } from 'src/app/service/common/api-common.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, AfterContentInit {
  productForm: FormGroup;
  categoryData: any;
  subCategoryData: any;
  image: File;
  productImages: Array<File> = [];
  preview_images = [];

  @ViewChild('autofocus' , {static: true}) autofocus: ElementRef;
  loader: boolean;

  constructor(
    private fb: FormBuilder,
    private apiCommon: ApiCommonService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddProductComponent>
  ) {
    this.productForm = this.fb.group({
      categoryId: ['', Validators.required],
      subCategoryId: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      position: ['', Validators.required],
      feature: [false],

      product_images: this.fb.array([
        this.createItem()
      ])
    });
   }

  ngOnInit() {
    this.apiCommon.get('category').subscribe(
      res => {
        this.categoryData = res;
      }
    );

    this.apiCommon.get('subcategory').subscribe(
      res => {
        this.subCategoryData = res;
      }
    );
  }

  createItem(): any {
    return this.fb.group({});
  }

  add_more_row(): void{
    (this.productForm.controls['product_images'] as FormArray).push(this.createItem());
  }

  remove_row(i): void{
    (this.productForm.controls['product_images'] as FormArray).removeAt(i);
    this.productImages.splice(i, 1);
    this.preview_images.splice(i, 1);
  }

  handleImage(event): void {
    if (event.target.files && event.target.files[0]) {
      this.image = <File>event.target.files[0];
    }
  }

  handleMultipleImage(event,i): void {
    if (event.target.files && event.target.files[0]) {
      this.productImages[i] = <File>event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(<File>event.target.files[0]); 
      reader.onload = (_event) => { 
        this.preview_images[i] = reader.result; 
      }
    }
  }

  onSubmit(): void{

    if (this.productForm.valid) {

      this.loader = true;

      const formData = new FormData();
      formData.append('categoryId', this.productForm.get('categoryId').value);
      formData.append('subCategoryId', this.productForm.get('subCategoryId').value);
      formData.append('title', this.productForm.get('title').value);
      formData.append('description', this.productForm.get('description').value);
      formData.append('position', this.productForm.get('position').value);
      formData.append('price', this.productForm.get('price').value);
      formData.append('quantity', this.productForm.get('quantity').value);
      formData.append('feature', this.productForm.get('feature').value);
      if (this.image){
        formData.append('image', this.image, this.image.name);
      }
      for (let i=0; i < this.productImages.length; i++){
        formData.append('productImages',this.productImages[i],this.productImages[i]['name']);
      }

      console.log(formData.getAll('productImages'));
      // return;

      this.apiCommon.store('product', formData).subscribe(
        res => {
          this.loader = false;
          if (res.status === 'success') {
            this.snackBar.open(res.message, 'close', {
              duration: 2500,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: ['snackbar-success']
            });
            this.dialogRef.close(res.data);
          }
        },
        err => {
          this.loader = false;
        }
      );
    }
  }

  ngAfterContentInit(): void {
    this.autofocus.nativeElement.focus();
  }

}
