import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Employee} from '../../employee.interface';
import {EmployeeService} from '../../services/employee.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Department} from '../../department.interface';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {

  employee: Employee;
  departments: Department[];
  isEditing: boolean;
  addEditFormGroup: FormGroup;
  today = new Date();
  ROLES = [
    'Associate',
    'Supervisor',
    'Manager',
    'Engineer',
    'Senior Engineer',
    'CEO'
  ];
  constructor(@Inject(MAT_DIALOG_DATA) data,
              private employeeService: EmployeeService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AddEditEmployeeComponent>) {
    if (data.isEditing) {
      this.employee = data.employee;
    }
    this.isEditing = data.isEditing;
    this.departments = data.departments;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    if (this.isEditing) {
      this.addEditFormGroup = this.formBuilder.group({
        firstName: new FormControl(this.employee.firstName.trim(), Validators.required),
        lastName: new FormControl(this.employee.lastName.trim(), Validators.required),
        departmentId: new FormControl(this.employee.departmentId, Validators.required),
        role:  new FormControl(this.employee.role.trim(), Validators.required),
        basicSalary:  new FormControl(this.employee.basicSalary, Validators.required),
        allowance:  new FormControl(this.employee.allowance, Validators.required),
        address:  new FormControl(this.employee.address.trim(), Validators.required),
        phone:  new FormControl(this.employee.phone.trim(), Validators.required),
        email:  new FormControl(this.employee.email.trim(), Validators.required),
        joinDate:  new FormControl(this.employee.joinDate.trim(), Validators.required),
        isActive:  new FormControl(this.employee.isActive === 1, Validators.required),
        eligibleForRehire:  new FormControl(this.employee.eligibleForRehire === 1, Validators.required),
        recentAppraisal:  new FormControl(this.employee.recentAppraisal, Validators.required)
      });
    } else {
      this.addEditFormGroup = this.formBuilder.group({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        departmentId: new FormControl(null, Validators.required),
        role:  new FormControl(null, Validators.required),
        basicSalary:  new FormControl(0, Validators.required),
        allowance:  new FormControl(0, Validators.required),
        address:  new FormControl('', Validators.required),
        phone:  new FormControl('', Validators.required),
        email:  new FormControl('', Validators.required),
        joinDate:  new FormControl(this.today.toDateString(), Validators.required),
        isActive:  new FormControl(false, Validators.required),
        eligibleForRehire:  new FormControl(false, Validators.required),
        recentAppraisal:  new FormControl(0, Validators.required)
      });
    }

  }

  submitForm(): void {
    const emp: Employee = {
      firstName: this.addEditFormGroup.value.firstName.trim(),
      lastName: this.addEditFormGroup.value.lastName.trim(),
      departmentId: this.addEditFormGroup.value.departmentId,
      role: this.addEditFormGroup.value.role,
      basicSalary: this.addEditFormGroup.value.basicSalary,
      allowance: this.addEditFormGroup.value.allowance,
      address: this.addEditFormGroup.value.address.trim(),
      phone: this.addEditFormGroup.value.phone.toString(),
      email: this.addEditFormGroup.value.email.trim(),
      joinDate: '',
      isActive: this.addEditFormGroup.value.isActive === true ? 1 : 0,
      eligibleForRehire: this.addEditFormGroup.value.eligibleForRehire === true ? 1 : 0,
      recentAppraisal: this.addEditFormGroup.value.recentAppraisal,
      department: null
    };

    if (this.isEditing) {
      emp.employeeId = this.employee.employeeId;
      this.employeeService.editEmployee(emp).subscribe(val => {
        this.dialogRef.close(emp);
      });
    } else {
      this.employeeService.addEmployee(emp).subscribe(val => {
        this.dialogRef.close(emp);
      });
    }
  }
}


