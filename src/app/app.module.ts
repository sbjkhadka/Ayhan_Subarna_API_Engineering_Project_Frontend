import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeService } from './services/employee.service';
import { DepartmentService } from './services/department.service';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatIconModule} from '@angular/material/icon';
import { AddEditEmployeeComponent } from './dashboard/add-edit-employee/add-edit-employee.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import { AdjustSalaryComponent } from './dashboard/adjust-salary/adjust-salary.component';
import { PromoteEmployeeComponent } from './dashboard/promote-employee/promote-employee.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { DepartmentDashboardComponent } from './department-dashboard/department-dashboard.component';
import { AddEditDepartmentComponent } from './department-dashboard/add-edit-department/add-edit-department.component';
import { ConfirmationDialogComponent } from './dashboard/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddEditEmployeeComponent,
    AdjustSalaryComponent,
    PromoteEmployeeComponent,
    DepartmentDashboardComponent,
    AddEditDepartmentComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule
  ],
  providers: [
    EmployeeService,
    DepartmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
