import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DepartmentService} from '../../services/department.service';
import {Department} from '../../department.interface';
import {Employee} from '../../employee.interface';
import {CustomDepartment} from '../../services/custom-department';

@Component({
  selector: 'app-add-edit-department',
  templateUrl: './add-edit-department.component.html',
  styleUrls: ['./add-edit-department.component.css']
})
export class AddEditDepartmentComponent implements OnInit {

  department: Department;
  isEditing: boolean;
  employees: Employee[];
  addEditFormGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private departmentService: DepartmentService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AddEditDepartmentComponent>) {
    if (data.isEditing) {
      this.department = data.department;
    }
    this.isEditing = data.isEditing;
    this.employees = data.employees;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    if (this.isEditing) {
      this.addEditFormGroup = this.formBuilder.group({
        departmentName: new FormControl(this.department.departmentName, Validators.required),
        managerId: new FormControl(this.department.managerId, Validators.required),
        description: new FormControl(this.department.description, Validators.required),
      });
    } else {
      this.addEditFormGroup = this.formBuilder.group({
        departmentName: new FormControl('', Validators.required),
        managerId: new FormControl(0, Validators.required),
        description: new FormControl(null, Validators.required),
      });
    }
  }

  submitForm() {
    const payload: CustomDepartment = {
      departmentName: this.addEditFormGroup.value.departmentName.trim(),
      managerId: Number(this.addEditFormGroup.value.managerId),
      description: this.addEditFormGroup.value.description.trim(),
    };

    if (this.isEditing) {
      payload.departmentId = this.department.departmentId;
      this.departmentService.editDepartment(payload).subscribe(val => {
        this.dialogRef.close(val);
      });
    } else {
      this.departmentService.createDepartment(payload).subscribe(val => {
        this.dialogRef.close(val);
      });
    }
  }
}
