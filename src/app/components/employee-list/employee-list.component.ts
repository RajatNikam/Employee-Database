import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { EmployeeDataService } from 'src/app/services/employee-data.service';
import { HttpsService } from 'src/app/services/https.service';
import { deleteEmployee, getEmployee } from 'src/app/store/actions/action';
import { EmployeeState } from 'src/app/store/reducers/reducers';
import { employee } from 'src/app/store/employee';
import { FilterService } from 'src/app/services/searchService/filter.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { employeeSelector } from 'src/app/store/selector/employee.selector';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employee: employee[] = [];
  // employee$ = this.store.select('employee');
  employee$ = this.store.pipe(select(employeeSelector))


  a: any;
  done = new Subject();
  searchWord: any;

  element: any;

  constructor(private employeedata: EmployeeDataService, private snackBar: MatSnackBar, private filter: FilterService, private https: HttpsService, private router: Router, private store: Store<EmployeeState>) {
    
  }

  ngOnInit(): void {

    this.employee$
    .pipe(takeUntil(this.done))
    .subscribe((data) => (this.employee = JSON.parse(JSON.stringify(data))));

    this.getlist()

    this.filter.rcvSearch.subscribe((response: any) => {
      this.searchWord = response
    })
    
  }


  getlist() {
    this.store.dispatch(getEmployee());

    // const sub = this.employeedata.getData().subscribe((response: any) => {
    //   this.employee = (response)
    // })

  }

  details(employe: any) {
    this.employeedata.details(employe)

    this.router.navigateByUrl('/dashboard/details')
  }

  delete(employeeId: number) {
    this.store.dispatch(deleteEmployee(employeeId))

    // this.employeedata.delete(id).subscribe((response) => {
    // })
    // this.router.navigateByUrl('/dashboard')

    this.employeedata.redirectTo('/dashboard')
    this.snackBar.open('Employee Deleted', 'close')._dismissAfter(2000);


  }

  edit(employe: any) {
    localStorage.setItem('id', employe.id)
    this.employeedata.edit(employe)
    this.employeedata.redirectTo('/dashboard/edit')
  }

}
