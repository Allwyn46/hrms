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
  ],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {
  employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: () => {},
      error: () => {},
    });
  }

  payments: Payment[] = [
    {
      id: 'm5gr84i9',
      amount: 316,
      status: 'success',
      email: 'ken99@example.com',
    },
    {
      id: '3u1reuv4',
      amount: 242,
      status: 'success',
      email: 'Abe45@example.com',
    },
  ];

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }

  getStatusVariant(status: Payment['status']): 'default' | 'secondary' | 'destructive' | 'outline' {
    switch (status) {
      case 'success':
        return 'default';
      case 'processing':
        return 'secondary';
      case 'failed':
        return 'destructive';
      case 'pending':
        return 'outline';
      default:
        return 'secondary';
    }
  }

  copyPaymentId(id: string): void {
    navigator.clipboard.writeText(id);
    console.log('Payment ID copied:', id);
  }

  viewDetails(payment: Payment): void {
    console.log('View payment details:', payment);
  }
}
