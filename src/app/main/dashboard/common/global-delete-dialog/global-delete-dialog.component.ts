import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { ApiCommonService } from 'src/app/service/common/api-common.service';

@Component({
  selector: 'app-global-delete-dialog',
  templateUrl: './global-delete-dialog.component.html',
  styleUrls: ['./global-delete-dialog.component.scss']
})
export class GlobalDeleteDialogComponent implements OnInit {

  loader = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<GlobalDeleteDialogComponent>,
    private apiCommon: ApiCommonService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  delete(): void {
    this.loader = true;
    this.apiCommon.delete(`${this.data.url}`, this.data.id).subscribe(
      res => {
        if (res.status === 'success') {
          this.dialogRef.close(`${this.data.id}`);
          this.snackBar.open(res.message, 'close', {
            duration: 2500,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['snackbar-success']
          });
          this.loader = false;
        }
      },
      error => {
        console.log(error);
        this.loader = false;
      }
    );
  }

}
