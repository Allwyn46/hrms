import { Component, inject } from '@angular/core';
import { ZardCardComponent } from '../../../../../n/card/card.component';
import { ZardButtonComponent } from '../../../../../n/button/button.component';
import { ZardAlertDialogService } from '../../../../../n/alert-dialog/alert-dialog.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/services/employee';

@Component({
  selector: 'app-login',
  imports: [ZardButtonComponent, ZardCardComponent, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  router = inject(Router);
  alertDialogService = inject(ZardAlertDialogService);
  employeeService = inject(Employee);

  loginForm: FormGroup = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  showSuccessDialog() {
    this.alertDialogService.confirm({
      zTitle: 'Logged In SuccessFully',
      zDescription:
        'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
      zOkText: undefined,
      zCancelText: undefined,
    });
  }

  onLogin() {
    const formData = this.loginForm.value;
    this.employeeService.onLogin(formData).subscribe({
      next: (response: any) => {
        if (response?.result == true) {
          this.showSuccessDialog();
          localStorage.setItem('loggedinUser', JSON.stringify(response.data));
          this.router.navigateByUrl('dashboard');
        }
      },
      error: (response) => {
        alert('Something went wrong');
        console.log(response);
      },
    });
  }
}
