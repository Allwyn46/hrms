import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZardButtonComponent } from 'n/button/button.component';
import { ZardInputDirective } from 'n/input/input.directive';
import { ZardSheetModule } from 'n/sheet/sheet.module';
import { ZardSheetService } from 'n/sheet/sheet.service';
import { CreateLeaveFormat } from 'src/app/models/Employee.model';
import { Employee } from 'src/app/services/employee';

@Component({
  selector: 'app-leave-add-sheet',
  imports: [ReactiveFormsModule, ZardInputDirective, ZardButtonComponent],
  templateUrl: './leave-add-sheet.html',
  styleUrl: './leave-add-sheet.css',
})
export class LeaveAddSheet implements OnInit {
  employeeService = inject(Employee);

  loggedinUser: any;

  user = {
    name: '',
    id: 0,
  };

  constructor() {
    const userString = localStorage.getItem('loggedinUser');
    if (userString) {
      this.loggedinUser = JSON.parse(userString);
    }
  }

  ngOnInit(): void {
    if (this.loggedinUser) {
      this.user = {
        name: this.loggedinUser.employeeName,
        id: this.loggedinUser.employeeId,
      };
    }
  }

  leaveForm = new FormGroup<CreateLeaveFormat>({
    details: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    fromDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    toDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    isApproved: new FormControl(false, { nonNullable: true }),
    approvedDate: new FormControl('', { nonNullable: true }),
    employeeId: new FormControl(this.user.id, { nonNullable: true }),
    leaveId: new FormControl(0, { nonNullable: true }),
    leaveType: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    noOfDays: new FormControl(0, { nonNullable: true }),
  });

  createLeave() {}
}

@Component({
  selector: 'leave-sheet-trigger',
  standalone: true,
  imports: [ZardButtonComponent, ZardSheetModule],
  template: ` <button z-button zType="secondary" (click)="openSheet()">Apply Leave</button> `,
})
export class EmployeeLeaveSheetComponent {
  private sheetService = inject(ZardSheetService);

  openSheet() {
    this.sheetService.create({
      zTitle: 'Add Employee',
      zDescription: `Fill the necesary fields for employee here. Click save when you're done.`,
      zContent: LeaveAddSheet,
      zOkText: null,
      zCancelText: null,
      zOnOk: (instance) => {
        console.log('Form submitted:');
      },
    });
  }
}
