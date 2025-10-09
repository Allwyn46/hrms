import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ZardButtonComponent } from 'n/button/button.component';
import { ZardSheetService } from 'n/sheet/sheet.service';
import { ZardInputDirective } from 'n/input/input.directive';
import { ZardSheetModule } from 'n/sheet/sheet.module';
import { EmployeeCreateForm, iSheetData } from 'src/app/models/Employee.model';
import { Observable, window } from 'rxjs';
import { Employee } from 'src/app/services/employee';
import { ZardSelectComponent } from 'n/select/select.component';
import { ZardSelectItemComponent } from 'n/select/select-item.component';
import { AsyncPipe } from '@angular/common';
import { StopPropagation } from 'src/app/directives/stop-propagation';

@Component({
  selector: 'app-employee-add-sheet',
  imports: [
    ReactiveFormsModule,
    ZardInputDirective,
    AsyncPipe,
    ZardSelectComponent,
    ZardSelectItemComponent,
    StopPropagation,
    ZardButtonComponent,
  ],
  templateUrl: './employee-add-sheet.html',
  styleUrl: './employee-add-sheet.css',
})
export class EmployeeAddSheet implements OnInit {
  employeeService = inject(Employee);
  DepartmentList$: Observable<any[]> = new Observable<any[]>();
  RolesList$: Observable<any[]> = new Observable<any[]>();

  ngOnInit(): void {
    this.DepartmentList$ = this.employeeService.getAllDepartments();
    this.RolesList$ = this.employeeService.getAllRoles();
  }

  public form = new FormGroup<EmployeeCreateForm>({
    employeeId: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    employeeName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    contactNo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    emailId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    deptId: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    gender: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    role: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  createEmployee() {
    const formData = this.form.value;
    this.employeeService.storeEmployee(formData).subscribe({
      next: (response: any) => {
        if (response?.Result == true) {
          this.employeeService.showSuccessToast('Success', 'Employee created successfully');
          this.employeeService.getAllEmployees();
        }
      },
      error: (error) => {
        this.employeeService.showErrorToast('Error', 'Failed to create employee');
      },
    });
  }
}

@Component({
  selector: 'sheet-trigger',
  standalone: true,
  imports: [ZardButtonComponent, ZardSheetModule],
  template: ` <button z-button zType="secondary" (click)="openSheet()">Add Employee</button> `,
})
export class EmployeeSheetComponent {
  private sheetService = inject(ZardSheetService);

  openSheet() {
    this.sheetService.create({
      zTitle: 'Add Employee',
      zDescription: `Fill the necesary fields for employee here. Click save when you're done.`,
      zContent: EmployeeAddSheet,
      zData: {
        name: 'Matheus Ribeiro',
        username: '@ribeiromatheus.dev',
      } as iSheetData,
      zOkText: null,
      zCancelText: null,
      zOnOk: (instance) => {
        console.log('Form submitted:', instance.form.value);
        instance.createEmployee();
      },
    });
  }
}
