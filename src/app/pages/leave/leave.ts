import { Component, inject, OnInit } from '@angular/core';
import { EmployeeLeaveType } from 'src/app/models/Employee.model';
import { Employee } from 'src/app/services/employee';
import {
  ZardTableBodyComponent,
  ZardTableCellComponent,
  ZardTableComponent,
  ZardTableHeadComponent,
  ZardTableHeaderComponent,
  ZardTableRowComponent,
} from 'n/table/table.component';
import { ZardBadgeComponent } from 'n/badge/badge.component';
import { ZardButtonComponent } from 'n/button/button.component';

@Component({
  selector: 'app-leave',
  imports: [
    ZardBadgeComponent,
    ZardTableBodyComponent,
    ZardTableCellComponent,
    ZardTableComponent,
    ZardTableHeadComponent,
    ZardTableHeaderComponent,
    ZardTableRowComponent,
    ZardButtonComponent,
  ],
  templateUrl: './leave.html',
  styleUrl: './leave.css',
})
export class Leave implements OnInit {
  employeeService = inject(Employee);
  leaveList: EmployeeLeaveType[] = [];

  loggedinUser: any;

  user = {
    name: '',
    id: 0,
  };

  constructor() {
    const userString = localStorage.getItem('loggedinUser');
    if (userString) {
      this.loggedinUser = JSON.parse(userString);
      console.log(this.loggedinUser);
    }
  }

  ngOnInit(): void {
    if (this.loggedinUser) {
      this.user = {
        name: this.loggedinUser.employeeName,
        id: this.loggedinUser.employeeId,
      };
    }

    this.fetchEmployeeLeave(this.user.id);
  }

  fetchEmployeeLeave(id: any) {
    this.employeeService.getEmployeeLeaves(id).subscribe({
      next: (response: any) => {
        this.leaveList = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getStatusVariant(
    status: boolean | null | undefined,
  ): 'default' | 'secondary' | 'destructive' | 'outline' {
    switch (status) {
      case true:
        return 'secondary';
      case false:
        return 'destructive';
      default:
        return 'outline';
    }
  }

  getStatusText(status: boolean | null | undefined): string {
    switch (status) {
      case true:
        return 'Approved';
      case false:
        return 'Rejected';
      default:
        return 'Pending';
    }
  }
}
