import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ApiCommonService } from 'src/app/service/common/api-common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loader = false;

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiCommon: ApiCommonService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { 
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  onSubmit(): void {

    if (this.registerForm.valid && this.registerForm.get('password').value !== this.registerForm.get('confirm_password').value) {
      this.snackBar.open('The password doesn\'t match', 'close', {
        duration: 2500,
        panelClass: ['snackbar-danger']
      });
      return;
    }

    if (this.registerForm.valid) {

      this.apiCommon.store('auth/register', this.registerForm.value).subscribe(
        res => {
          if (res.status === 'success') {
            this.router.navigateByUrl('/login');
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
