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

export interface EmployeeLeaveType {
  details: string;
  employeeId: number;
  employeeName: string;
  fromDate: string;
  leaveId: number;
  leaveType: string;
  noOfDays: number;
  toDate: string;
  approvedDate: string;
  isApproved: boolean;
}

export interface CreateLeaveFormat {
  leaveId: FormControl<number>;
  employeeId: FormControl<number>;
  fromDate: FormControl<string>;
  toDate: FormControl<string>;
  noOfDays: FormControl<number>;
  leaveType: FormControl<string>;
  details: FormControl<string>;
  isApproved: FormControl<boolean>;
  approvedDate: FormControl<string>;
}
