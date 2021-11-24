import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Department} from '../department.interface';
import {Employee} from '../employee.interface';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {EmployeeService} from '../services/employee.service';
import {AddEditDepartmentComponent} from './add-edit-department/add-edit-department.component';
import {DepartmentService} from '../services/department.service';
import {ConfirmationDialogComponent} from '../dashboard/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-department-dashboard',
  templateUrl: './department-dashboard.component.html',
  styleUrls: ['./department-dashboard.component.css']
})
export class DepartmentDashboardComponent implements OnInit {

  @Input() departments: BehaviorSubject<Department[]>;
  dataSource = new BehaviorSubject<MatTableDataSource<Department>>(null);
  @Input() employees: BehaviorSubject<Employee[]>;
  employeeList: Employee[] = [];
  displayedColumns: string[] = ['name', 'manager', 'description', 'action'];
  constructor(private dialog: MatDialog,
              private employeeService: EmployeeService,
              private cdRef: ChangeDetectorRef,
              private departmentService: DepartmentService) {
  }

  ngOnInit(): void {
    this.employees.subscribe(value => {
      value.forEach(emp => {
        this.employeeList.push(emp);
      });
    });

    this.departments.subscribe(departments => {
      this.dataSource.next(new MatTableDataSource<Department>(departments));
    });
  }

  getEmployeeNameFromEmployeeId(department: Department): string {
    if (this.employeeList && this.employeeList.length > 0) {
      const index = this.employeeList.findIndex(e => e.employeeId === department.managerId);
      if (index === -1) {return '';}
      return `${this.employeeList[index].firstName} ${this.employeeList[index].lastName}`;
    }
    return department.managerId.toString();
  }

  addEditDepartment(event, isEditing: boolean, department?: Department) {
    event.stopPropagation();
    this.dialog.open(AddEditDepartmentComponent,
      {
        maxWidth: '40vw',
        maxHeight: '40vh',
        height: '100%',
        width: '100%',
        panelClass: 'no-padding-container',
        data: {
          isEditing,
          department,
          employees: this.employeeList
        }
      }).afterClosed().subscribe((newDepartment: Department) => {
      if (newDepartment) {
        const existing = this.departments.value;
        const index = existing.findIndex(d => d.departmentId === newDepartment.departmentId);
        if (index >= 0) {
          existing[index] = newDepartment;
        } else {
          existing.push(newDepartment);
        }
        this.departments.next(existing);
        this.dataSource.next(new MatTableDataSource<Department>(existing));
        this.cdRef.detectChanges();
      }
    });
  }

  deleteDepartment(event, department: Department) {
    event.stopPropagation();

    const deleteRef = this.dialog.open(ConfirmationDialogComponent, {
      height: '200px',
      width: '500px',
      panelClass: 'no-padding-container',
      data: {
        itemType: 'Department'
      }
    });
    deleteRef.afterClosed().subscribe(decision => {
      if (decision) {
        this.departmentService.deleteDepartment(department).subscribe(value => {
          if (value.status === 200) {
            const existing = this.departments.value;
            const index = existing.findIndex(d => d.departmentId === department.departmentId);
            existing.splice(index, 1);
            this.departments.next(existing);
            this.dataSource.next(new MatTableDataSource<Department>(existing));
            this.cdRef.detectChanges();
            }
        });
      }
    });
  }

  // Avoids accidental deletion of department tables that is used in employee table
  isDepartmentIsUsedInEmployeeTable(department: Department): boolean {
    if (this.employeeList && this.employeeList.length > 0) {
      const index = this.employeeList.findIndex(e => e.departmentId === department.departmentId);
      return index >= 0;
    }
  }
}
