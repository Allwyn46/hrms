import { Component, inject } from '@angular/core';
import { ZardCardComponent } from '../../../../../n/card/card.component';
import { ZardButtonComponent } from '../../../../../n/button/button.component';
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
  employeeService = inject(Employee);

  loginForm: FormGroup = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onLogin() {
    const formData = this.loginForm.value;
    this.employeeService.onLogin(formData).subscribe({
      next: (response: any) => {
        if (response?.result == true) {
          this.employeeService.showSuccessToast('Success', 'Logged in successfully');
          localStorage.setItem('loggedinUser', JSON.stringify(response.data));
          this.router.navigateByUrl('dashboard');
        }
      },
      error: (response) => {
        this.employeeService.showErrorToast('Error', 'Failed to log in');
        console.log(response);
      },
    });
  }
}
