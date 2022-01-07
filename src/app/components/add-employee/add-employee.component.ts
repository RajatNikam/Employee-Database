import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EmployeeDataService } from 'src/app/services/employee-data.service';
import { addEmployee } from 'src/app/store/actions/action';
import { employee } from 'src/app/store/employee';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class AddEmployeeComponent implements OnInit, OnChanges {

  registerForm!: FormGroup;
  submitted = false;

  x: any;

  month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  formattedDate: any;
  formattedDate1: any;

  payload: any;


  valueY: number = 0;

  formatLabel(value: number) {
    if (value >= 0) {
      this.valueY = value
      return Math.round(value / 1) + 'Y';
    }
    return value;
  }

  // experience dynamic
  gridsize: any;
  updateSetting(event: any) {
    this.gridsize = event.value;
  }

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private employeedata: EmployeeDataService, private router: Router, private store: Store) {
    this.x = Math.floor((Math.random() * 10) + 5);

  }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      DOB: ['', Validators.required],
      maritialStatus: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
      city: ['', Validators.required],
      phone_numbers: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      position: ['', Validators.required],
      workFormat: ['', Validators.required],
      qualification: ['', Validators.required],
      experience: ['', Validators.required],
      DOJ: ['', Validators.required],
      CTC: ['', Validators.required],
      // photo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    this.payload = {
      title: this.registerForm.value.title,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      gender: this.registerForm.value.gender,
      DOB: this.registerForm.value.DOB,
      // DOB: this.formattedDate,
      maritialStatus: this.registerForm.value.maritialStatus,
      city: this.registerForm.value.city,
      phone_numbers: this.registerForm.value.phone_numbers,
      position: this.registerForm.value.position,
      workFormat: this.registerForm.value.workFormat,
      qualification: this.registerForm.value.qualification,
      experience: this.registerForm.value.experience,
      id: this.valueY,
      DOJ: this.registerForm.value.DOJ,
      CTC: this.registerForm.value.CTC,
      email: this.registerForm.value.email,
      photo: 'assets/faces/' + this.x + '.jpg',
      country: 'India',
      DOB1: this.formattedDate,
      DOJ1: this.formattedDate1
    }


    // this.payload = new employee();
    // this.store.dispatch(addEmployee(this.payload))


    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    } else {
      this.store.dispatch(addEmployee(this.payload))
      // this.employeedata.addData(this.payload).subscribe((response: any) => {
      //   console.log(response);
      // })
    }

    // display form values on success
    this.router.navigateByUrl('/dashboard')
    this.snackBar.open('New Employee Added', 'close')._dismissAfter(2000);
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
    this.snackBar.open('Employee Form Reset', 'close')._dismissAfter(2000);
  }

  yourFunctionName(event: any) {
    const data = event;
    this.formattedDate = data.getDate() + ' ' + this.month[data.getMonth()] + ' ' + data.getFullYear();
    console.log(this.formattedDate);

  }

  yourFunctionName1(event: any) {
    const data = event;
    this.formattedDate1 = data.getDate() + ' ' + this.month[data.getMonth()] + ' ' + data.getFullYear();
    console.log(this.formattedDate1);

  }

} 