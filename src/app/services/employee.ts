import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toast } from 'ngx-sonner';
import { ZardToastComponent } from '../../../n/toast/toast.component';

@Injectable({
  providedIn: 'root',
})
export class Employee {
  http = inject(HttpClient);

  onLogin(formData: any) {
    return this.http.post('/api/EmployeeLeave/Login', formData);
  }

  showSuccessToast(title: string, desc: string) {
    toast.success(title, {
      description: desc,
    });
  }

  showErrorToast(title: string, desc: string) {
    toast.error(title, {
      description: desc,
    });
  }
}
