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
  ],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {
  employeeService = inject(EmployeeService);
  employeeList: EmployeeListData[] = [];

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

  onEdit(item: any) {}

  copyPaymentId(id: string): void {
    navigator.clipboard.writeText(id);
    console.log('Payment ID copied:', id);
  }

  viewDetails(payment: Payment): void {
    console.log('View payment details:', payment);
  }
}
