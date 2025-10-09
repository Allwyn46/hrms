import { Component, inject, OnInit } from '@angular/core';
import { ZardBadgeComponent } from 'n/badge/badge.component';
import { ZardButtonComponent } from 'n/button/button.component';
import {
  ZardTableBodyComponent,
  ZardTableCellComponent,
  ZardTableComponent,
  ZardTableHeadComponent,
  ZardTableHeaderComponent,
  ZardTableRowComponent,
} from 'n/table/table.component';
import { Employee as EmployeeService } from '../../services/employee';
import {
  DepartmentListFormat,
  EmployeeApiResponse,
  EmployeeListData,
} from 'src/app/models/Employee.model';
import {
  EmployeeAddSheet,
  EmployeeSheetComponent,
} from 'src/app/components/employee-add-sheet/employee-add-sheet';
import { EmployeeEditSheetComponent } from 'src/app/components/employee-edit-sheet/employee-edit-sheet';
import { ZardAlertDialogService } from 'n/alert-dialog/alert-dialog.service';

export interface Payment {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
}

@Component({
  selector: 'app-employee',
  imports: [
    ZardButtonComponent,
    ZardBadgeComponent,
    ZardTableBodyComponent,
    ZardTableCellComponent,
    ZardTableComponent,
    ZardTableHeadComponent,
    ZardTableHeaderComponent,
    ZardTableRowComponent,
    EmployeeAddSheet,
    EmployeeSheetComponent,
    EmployeeEditSheetComponent,
  ],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {
  employeeService = inject(EmployeeService);
  employeeList: EmployeeListData[] = [];
  private alertDialogService = inject(ZardAlertDialogService);

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (response: EmployeeApiResponse) => {
        this.employeeList = response?.data;
      },
      error: (error) => {
        this.employeeService.showErrorToast('Error', 'Failed to fetch Employees');
      },
    });
  }

  deleteEmployee(id: any) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (response: any) => {
        if (response?.result == true) {
          this.employeeService.showSuccessToast('Success', 'Employee Deleted Successfully');
          this.fetchEmployees();
          window.location.reload();
        }
      },
      error: (error) => {
        console.log(error);
        this.employeeService.showErrorToast('Error', 'Failed to delete employee');
      },
    });
  }

  showDialog(id: any) {
    this.alertDialogService.confirm({
      zTitle: 'Are you absolutely sure?',
      zDescription:
        'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
      zOkText: 'Continue',
      zCancelText: 'Cancel',
      zOnOk: () => {
        this.deleteEmployee(id);
      },
    });
  }
}
