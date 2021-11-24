import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import {Employee} from '../employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<any>(`${environment.base_url}Employees`).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<any>(`${environment.base_url}Employees`, employee).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete<any>(`${environment.base_url}Employees/${employeeId}`).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  editEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<any>(`${environment.base_url}Employees/${employee.employeeId}`, employee).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  adjustSalary(payload: any): Observable<Employee> {
    return this.http.put<any>(`${environment.base_url}Employees/salary`, payload).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  promoteEmployee(payload: any): Observable<any> {
    return this.http.put<any>(`${environment.base_url}Employees/promote`, payload).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  activateDeactivateEmployee(payload: any) {
    return this.http.put<any>(`${environment.base_url}Employees/activate/${payload.employeeId}/${payload.status}`, {})
      .pipe(catchError(error => {
      return throwError(error);
    }));
  }

  transferEmployee(payload: any) {
    return this.http.put<any>(`${environment.base_url}Employees/transfer/${payload.employeeId}/${payload.departmentId}`, {})
      .pipe(catchError(error => {
        return throwError(error);
      }));
  }

  giveAppraisal(payload: any) {
    return this.http.put<any>(`${environment.base_url}Employees/appraisal/${payload.employeeId}/${payload.appraisal}`, {})
      .pipe(catchError(error => {
        return throwError(error);
      }));
  }
}

