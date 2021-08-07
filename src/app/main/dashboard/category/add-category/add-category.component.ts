import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiCommonService } from 'src/app/service/common/api-common.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, AfterContentInit {

  categoryForm: FormGroup;
  @ViewChild('autofocus' , {static: true}) autofocus: ElementRef;
  loader: boolean;

  constructor(
    private fb: FormBuilder,
    private apiCommon: ApiCommonService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddCategoryComponent>
  ) {
    this.categoryForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      position: ['', Validators.required],
    });
   }

  ngOnInit() {
  }

  onSubmit(): void {

    if (this.categoryForm.valid) {
      this.loader = true;
      this.apiCommon.store('category', this.categoryForm.value).subscribe(
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
