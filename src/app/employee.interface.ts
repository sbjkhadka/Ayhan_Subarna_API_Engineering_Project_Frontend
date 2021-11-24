import {Department} from './department.interface';

export interface Employee {
  employeeId?: number;
  firstName: string;
  lastName: string;
  departmentId: number;
  role: string;
  basicSalary: number;
  allowance: number;
  address: string;
  phone: string;
  email: string;
  joinDate: string;
  isActive: number;
  eligibleForRehire: number;
  recentAppraisal: number;
  department?: Department;
}
