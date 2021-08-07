import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiCommonService } from 'src/app/service/common/api-common.service';
import { StorageService } from 'src/app/service/common/storage.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loader = false;

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiCommon: ApiCommonService,
    private storage: StorageService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
   }

  ngOnInit() {
  }

  onSubmit(): void {

    if (this.loginForm.valid) {

      this.apiCommon.store('auth/login', this.loginForm.value).subscribe(
        res => {
          if (res.status === 'success') {
            this.storage.setAccessToken(res.token);
            this.router.navigateByUrl('/dashboard');
            this.snackBar.open(res.message, 'close', {
              duration: 2500,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: ['snackbar-success']
            });
          }
        }
      );
    }
  }

}
