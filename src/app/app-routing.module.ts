import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: EmployeeDashboardComponent,
    children: [
      { path: '', component: EmployeeListComponent },
      { path: 'details', component: EmployeeDetailsComponent },
      { path: 'edit', component: EditEmployeeComponent },
      { path: 'add', component: AddEmployeeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
