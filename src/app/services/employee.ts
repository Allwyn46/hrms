import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toast } from 'ngx-sonner';
import { ZardToastComponent } from '../../../n/toast/toast.component';
import { map, Observable } from 'rxjs';
import {
  DepartmentListFormat,
  EmployeeApiResponse,
  EmployeeCreateForm,
} from '../models/Employee.model';

@Injectable({
  providedIn: 'root',
})
export class Employee {
  http = inject(HttpClient);

  onLogin(formData: any) {
    return this.http.post('/api/EmployeeLeave/Login', formData);
  }

  getAllEmployees(): Observable<EmployeeApiResponse> {
    return this.http.get<EmployeeApiResponse>('/api/EmployeeLeave/GetEmployees');
  }

  getAllDepartments() {
    return this.http
      .get('/api/EmployeeLeave/GetDepartments')
      .pipe(map((response: any) => response.data));
  }

  getAllRoles() {
    return this.http
      .get('/api/EmployeeLeave/GetAllRoles')
      .pipe(map((response: any) => response.data));
  }

  storeEmployee(formData: any) {
    return this.http.post('/api/EmployeeLeave/CreateEmployee', formData);
  }

  updateEmployee(formData: any) {
    return this.http.put('/api/EmployeeLeave/UpdateEmployee', formData);
  }

  deleteEmployee(id: any) {
    const params = new HttpParams().set('id', id);
    return this.http.delete('/api/EmployeeLeave/DeleteEmployee', { params });
  }

  getEmployeeLeaves(id: any) {
    const params = new HttpParams().set('id', id);
    return this.http.get('/api/EmployeeLeave/GetAllLeavesByEmployeeId', { params });
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
