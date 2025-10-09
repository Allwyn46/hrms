import { AsyncPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZardButtonComponent } from 'n/button/button.component';
import { ZardInputDirective } from 'n/input/input.directive';
import { ZardSheetModule } from 'n/sheet/sheet.module';
import { ZardSheetService } from 'n/sheet/sheet.service';
import { Observable } from 'rxjs';
import { EmployeeCreateForm, iSheetData } from 'src/app/models/Employee.model';
import { Employee } from 'src/app/services/employee';
import { Z_MODAL_DATA } from 'n/sheet/sheet.service';

@Component({
  selector: 'app-employee-edit-sheet',
  imports: [ReactiveFormsModule, ZardInputDirective, AsyncPipe, ZardButtonComponent],
  templateUrl: './employee-edit-sheet.html',
  styleUrl: './employee-edit-sheet.css',
})
export class EmployeeEditSheet implements OnInit {
  employeeService = inject(Employee);
  DepartmentList$: Observable<any[]> = new Observable<any[]>();
  RolesList$: Observable<any[]> = new Observable<any[]>();
  existingEmployeeData = inject(Z_MODAL_DATA);

  ngOnInit(): void {
    this.DepartmentList$ = this.employeeService.getAllDepartments();
    this.RolesList$ = this.employeeService.getAllRoles();

    if (this.existingEmployeeData) {
      console.log(this.existingEmployeeData);
      this.editform.patchValue(this.existingEmployeeData);
    }
  }

  public editform = new FormGroup<EmployeeCreateForm>({
    employeeId: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    employeeName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    contactNo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    emailId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    deptId: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true }),
    gender: new FormControl('', { nonNullable: true }),
    role: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  updateEmployee() {
    const formData = this.editform.value;
    this.employeeService.updateEmployee(formData).subscribe({
      next: (response: any) => {
        if (response?.Result == true) {
          this.employeeService.showSuccessToast('Success', 'Employee updated successfully');
          this.employeeService.getAllEmployees();
        }
      },
      error: (error) => {
        this.employeeService.showErrorToast('Error', 'Failed to Update employee');
      },
    });
  }
}

@Component({
  selector: 'edit-sheet-trigger',
  standalone: true,
  imports: [ZardButtonComponent, ZardSheetModule],
  template: ` <button z-button zType="secondary" (click)="onEdit()">Edit</button> `,
})
export class EmployeeEditSheetComponent {
  private sheetService = inject(ZardSheetService);

  @Input() employee!: any;

  onEdit() {
    this.openSheet(this.employee);
  }

  openSheet(employee: any) {
    this.sheetService.create({
      zTitle: 'Edit Employee',
      zDescription: `Fill the necesary fields for employee here. Click save when you're done.`,
      zContent: EmployeeEditSheet,
      zData: employee,
      zOkText: null,
      zCancelText: null,
      zOnOk: (instance) => {
        console.log('Form submitted:', instance.editform.value);
      },
    });
  }
}
