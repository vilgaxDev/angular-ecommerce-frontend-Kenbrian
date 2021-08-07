import { Component, OnInit, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiCommonService } from 'src/app/service/common/api-common.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubCategoryComponent implements OnInit, AfterContentInit {

  subcategoryForm: FormGroup;
  categoryData: any;
  loader: boolean;
  @ViewChild('autofocus' , {static: true}) autofocus: ElementRef;

  constructor(
    private fb: FormBuilder,
    private apiCommon: ApiCommonService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddSubCategoryComponent>
  ) {
    this.subcategoryForm = this.fb.group({
      categoryId: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      position: ['', Validators.required],
    });
   }

  ngOnInit() {

    this.apiCommon.get('category').subscribe(
      res => {
        this.categoryData = res;
      }
    );

  }

  onSubmit(): void {

    if (this.subcategoryForm.valid) {
      this.loader = true;
      this.apiCommon.store('subcategory', this.subcategoryForm.value).subscribe(
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
