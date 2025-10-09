import { FormControl } from '@angular/forms';

export interface EmployeeApiResponse {
  message: string;
  result: boolean;
  data: any;
}

export interface EmployeeListData {
  employeeId: number;
  employeeName: string;
  deptId: number;
  deptName: string;
  contactNo: string;
  emailId: string;
  role: string;
}

export interface iSheetData {
  name: string;
  username: string;
}

export interface DepartmentListFormat {
  deptId: number;
  deptName: string;
  deptHeadName: string;
  deptHeadEmpId: number;
  createdDate: string | null;
}

export interface EmployeeCreateForm {
  employeeId: FormControl<number>;
  employeeName: FormControl<string>;
  contactNo: FormControl<string>;
  emailId: FormControl<string>;
  deptId: FormControl<number>;
  password: FormControl<string>;
  gender: FormControl<string>;
  role: FormControl<string>;
}
