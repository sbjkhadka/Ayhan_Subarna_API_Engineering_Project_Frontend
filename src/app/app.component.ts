import {Component, OnInit} from '@angular/core';
import { EmployeeService } from './services/employee.service';
import {BehaviorSubject} from 'rxjs';
import {Employee} from './employee.interface';
import {DepartmentService} from './services/department.service';
import {Department} from './department.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private employeeService: EmployeeService,
              private departmentService: DepartmentService) {}

  dataSource = new BehaviorSubject<Employee[]>(null);
  departments = new BehaviorSubject<Department[]>(null);
  ngOnInit() {
   this.getAllData();
  }

  getAllData(): void {
    this.getAllEmployees();
    this.getAllDepartments();
  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(value => {
      this.dataSource.next(value);
    });
  }

  getAllDepartments(): void {
    this.departmentService.getAllDepartments().subscribe(value => {
      this.departments.next(value);
    });
  }

}

