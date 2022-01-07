import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from 'src/app/services/employee-data.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  id: any;
  firstName: any;
  lastName: any;
  email: any;
  phone_numbers: any;
  position: any;
  country: any;
  gender: any;
  qualification: any;
  experience: any;
  city: any;
  photo: any;

  employe:any

  emp1: any;

  constructor(private employeedata: EmployeeDataService) {
    this.emp1= this.employeedata.emp
   }

  ngOnInit(): void {
  
      console.log(this.emp1.id);
  }

}