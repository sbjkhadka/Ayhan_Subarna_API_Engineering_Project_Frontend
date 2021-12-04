import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {Department} from '../department.interface';
import {CustomDepartment} from './custom-department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<any>(`${environment.base_url}departments`).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  createDepartment(department: CustomDepartment): Observable<any> {
    return this.http.post<any>(`${environment.base_url}Departments`, department).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  editDepartment(department: CustomDepartment): Observable<any> {
    return this.http.put<any>(`${environment.base_url}Departments/${department.departmentId}`, department).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  deleteDepartment(department: Department): Observable<any> {
    return this.http.delete<any>(`${environment.base_url}Departments/${department.departmentId}`).pipe(catchError(error => {
      return throwError(error);
    }));
  }
}
