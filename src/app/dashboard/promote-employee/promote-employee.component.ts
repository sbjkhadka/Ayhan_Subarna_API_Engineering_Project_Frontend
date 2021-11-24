import {Component, Inject, OnInit} from '@angular/core';
import {Employee} from '../../employee.interface';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EmployeeService} from '../../services/employee.service';

@Component({
  selector: 'app-promote-employee',
  templateUrl: './promote-employee.component.html',
  styleUrls: ['./promote-employee.component.css']
})
export class PromoteEmployeeComponent implements OnInit {

  employee: Employee;
  promoteEmployeeFormGroup: FormGroup;
  ROLES = [
    'Associate',
    'Supervisor',
    'Manager',
    'Engineer',
    'Senior Engineer',
    'CEO'
  ];
  constructor(@Inject(MAT_DIALOG_DATA) data,
              private formBuilder: FormBuilder,
              private employeeService: EmployeeService,
              public dialogRef: MatDialogRef<PromoteEmployeeComponent>) {
    this.employee = data.employee;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.promoteEmployeeFormGroup = this.formBuilder.group({
      role:  new FormControl(this.employee.role.trim(), Validators.required),
      basicSalary:  new FormControl(this.employee.basicSalary, Validators.required),
      allowance:  new FormControl(this.employee.allowance, Validators.required),
    });
  }

  submitForm() {
    const payload = {
      employeeId: this.employee.employeeId,
      role: this.promoteEmployeeFormGroup.value.role,
      basicSalary: this.promoteEmployeeFormGroup.value.basicSalary,
      allowance: this.promoteEmployeeFormGroup.value.allowance
    };
    this.employeeService.promoteEmployee(payload).subscribe(value => {
      this.dialogRef.close(value);
    });
  }

}
