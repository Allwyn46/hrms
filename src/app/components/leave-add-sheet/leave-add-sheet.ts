import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZardButtonComponent } from 'n/button/button.component';
import { ZardInputDirective } from 'n/input/input.directive';
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
  });
}
