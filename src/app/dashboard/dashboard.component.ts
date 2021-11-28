import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Employee } from '../employee.interface';
import {MatDialog} from '@angular/material/dialog';
import {AddEditEmployeeComponent} from './add-edit-employee/add-edit-employee.component';
import {Department} from '../department.interface';
import {BehaviorSubject} from 'rxjs';
import {EmployeeService} from '../services/employee.service';
import {MatTableDataSource} from '@angular/material/table';
import {AdjustSalaryComponent} from './adjust-salary/adjust-salary.component';
import {PromoteEmployeeComponent} from './promote-employee/promote-employee.component';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DashboardComponent implements OnInit {

  @Output() retakeData: EventEmitter<any> = new EventEmitter<any>();

  isEmployeeShowing =  true;

  @Input() employees: BehaviorSubject<Employee[]>;
  dataSource = new BehaviorSubject<MatTableDataSource<Employee>>(null);
  @Input() departments: BehaviorSubject<Department[]>;
  departmentList: Department[] = [];
  displayedColumns: string[] = ['name', 'role', 'department', 'basicSalary', 'allowance', 'isActive', 'eligibleForRehire', 'action'];
  selection = new SelectionModel<Employee>(true, []);
  expandedElement: any | null;

  constructor(private dialog: MatDialog,
              private employeeService: EmployeeService,
              private cdRef: ChangeDetectorRef) {
  }

  addEditEmployee(event, isEditing: boolean, employee?: Employee): void {
    event.stopPropagation();
    this.dialog.open(AddEditEmployeeComponent,
      {
        maxWidth: '40vw',
        maxHeight: '70vh',
        height: '100%',
        width: '100%',
        panelClass: 'no-padding-container',
        data: {
          isEditing,
          employee,
          departments: this.departmentList
        }
      }).afterClosed().subscribe((newEmployee: Employee) => {
        if (newEmployee) {
          const existing = this.employees.value;
          const index = existing.findIndex(d => d.employeeId === newEmployee.employeeId);
          newEmployee.departmentId = Number(newEmployee.departmentId);
          if (index >= 0) {
            existing[index] = newEmployee;
          } else {
            existing.push(newEmployee);
          }
          this.employees.next(existing);
          this.dataSource.next(new MatTableDataSource<Employee>(existing));
          this.cdRef.detectChanges();
        }
    });
  }

  deleteEmployee(event, employee: Employee) {
    event.stopPropagation();
    const deleteRef = this.dialog.open(ConfirmationDialogComponent, {
      height: '200px',
      width: '500px',
      panelClass: 'no-padding-container',
      data: {
        itemType: 'Employee'
      }
    });
    deleteRef.afterClosed().subscribe(decision => {
      if (decision) {
        this.employeeService.deleteEmployee(employee.employeeId).subscribe(value => {
          if (value.status === 200) {
            const existing = this.employees.value;
            const index = existing.findIndex(d => d.employeeId === employee.employeeId);
            existing.splice(index, 1);
            this.employees.next(existing);
            this.dataSource.next(new MatTableDataSource<Employee>(existing));
            this.cdRef.detectChanges();
          }
        });
      }
    });
  }

  adjustPay(event, employee: Employee) {
    event.stopPropagation();

    this.dialog.open(AdjustSalaryComponent,
      {
        maxWidth: '40vw',
        maxHeight: '25vh',
        height: '100%',
        width: '100%',
        panelClass: 'no-padding-container',
        data: {
          employee,
        }
      }).afterClosed().subscribe((newEmployee: Employee) => {
      if (newEmployee) {
        const existing = this.employees.value;
        const index = existing.findIndex(d => d.employeeId === newEmployee.employeeId);
        existing[index] = newEmployee;
        this.employees.next(existing);
        this.dataSource.next(new MatTableDataSource<Employee>(existing));
        this.cdRef.detectChanges();
      }
    });

  }

  promoteEmployee(event, employee: Employee) {
    event.stopPropagation();

    this.dialog.open(PromoteEmployeeComponent,
      {
        maxWidth: '40vw',
        maxHeight: '30vh',
        height: '100%',
        width: '100%',
        panelClass: 'no-padding-container',
        data: {
          employee,
        }
      }).afterClosed().subscribe((newEmployee: Employee) => {
      if (newEmployee) {
        const existing = this.employees.value;
        const index = existing.findIndex(d => d.employeeId === newEmployee.employeeId);
        existing[index] = newEmployee;
        this.employees.next(existing);
        this.dataSource.next(new MatTableDataSource<Employee>(existing));
        this.cdRef.detectChanges();
      }
    });

  }

  switchEmployeeStatus(event, employee: Employee): void {
    const payload = {
      employeeId: employee.employeeId,
      status: event.checked ? 1 : 0
    };
    this.employeeService.activateDeactivateEmployee(payload).subscribe(emp => {
      if (emp) {
        const existing = this.employees.value;
        const index = existing.findIndex(d => d.employeeId === emp.employeeId);
        existing[index] = emp;
        this.employees.next(existing);
        this.dataSource.next(new MatTableDataSource<Employee>(existing));
        this.cdRef.detectChanges();
      }
    });
  }

  getDepartmentNameFromDepartmentId(employee: Employee): string {
    console.log('depart', this.departmentList);
    if (this.departmentList && this.departmentList.length > 0) {
      const index = this.departmentList.findIndex(d => d.departmentId === employee.departmentId);
      return this.departmentList[index].departmentName;
    }
    return employee.departmentId.toString();
  }

  transferEmployee(event, employee: Employee) {
    console.log(event.value);
    const payload = {
      employeeId: employee.employeeId,
      departmentId: event.value
    };
    this.employeeService.transferEmployee(payload).subscribe(transferred => {
      console.log('trans', transferred);
      if (transferred) {
        const existing = this.employees.value;
        const index = existing.findIndex(d => d.employeeId === transferred.employeeId);
        existing[index] = transferred;
        this.employees.next(existing);
        this.dataSource.next(new MatTableDataSource<Employee>(existing));
        this.cdRef.detectChanges();
        }
    });

  }

  changeAppraisal(event, element) {
    const payload = {
      employeeId: element.employeeId,
      appraisal: event.target.value
    };
    this.employeeService.giveAppraisal(payload).subscribe(appraisal => {
      if (appraisal) {
        const existing = this.employees.value;
        const index = existing.findIndex(d => d.employeeId === appraisal.employeeId);
        existing[index] = appraisal;
        this.employees.next(existing);
        this.dataSource.next(new MatTableDataSource<Employee>(existing));
        this.cdRef.detectChanges();
      }
    });
  }

  ngOnInit(): void {
    this.employees.subscribe(ds => {
      this.dataSource.next(new MatTableDataSource<Employee>(ds));
    });
    this.departments.subscribe(dept => {
      this.departmentList = dept;
    });
  }

  toggleView(): void {
    this.retakeData.emit();
    this.isEmployeeShowing = !this.isEmployeeShowing;
  }
}
