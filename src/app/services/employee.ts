import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Employee {
  http = inject(HttpClient);

  onLogin(formData: any) {
    return this.http.post('/api/EmployeeLeave/Login', formData);
  }
}
