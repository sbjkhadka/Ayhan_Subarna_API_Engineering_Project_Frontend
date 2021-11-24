import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Employee} from '../../employee.interface';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../services/employee.service';

@Component({
  selector: 'app-adjust-salary',
  templateUrl: './adjust-salary.component.html',
  styleUrls: ['./adjust-salary.component.css']
})
export class AdjustSalaryComponent implements OnInit {

  employee: Employee;
  adjustSalaryFormGroup: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) data,
              private formBuilder: FormBuilder,
              private employeeService: EmployeeService,
              public dialogRef: MatDialogRef<AdjustSalaryComponent>) {
    this.employee = data.employee;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.adjustSalaryFormGroup = this.formBuilder.group({
      basicSalary:  new FormControl(this.employee.basicSalary, Validators.required),
      allowance:  new FormControl(this.employee.allowance, Validators.required),
    });
  }

  submitForm() {

    const payload = {
      employeeId: this.employee.employeeId,
      basicSalary: this.adjustSalaryFormGroup.value.basicSalary,
      allowance: this.adjustSalaryFormGroup.value.allowance
    };
    this.employeeService.adjustSalary(payload).subscribe(value => {
      this.dialogRef.close(value);
    });
  }

}
