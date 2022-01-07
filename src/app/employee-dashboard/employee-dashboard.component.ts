import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from '../services/searchService/filter.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {

  employee: any;
  isSearch= false;

  constructor(private router: Router, private filter: FilterService) { }

  ngOnInit(): void {
  }

  addEmployee() {
    this.router.navigateByUrl("/dashboard/add")
  }

  dashboard() {
    this.router.navigateByUrl("/dashboard")
  }

  shareSearchWord(search: any) {
    this.filter.sendSearch(search);
  }
}