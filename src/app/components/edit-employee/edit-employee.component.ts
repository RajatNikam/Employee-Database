import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EmployeeDataService } from 'src/app/services/employee-data.service';
import { updateEmployee } from 'src/app/store/actions/action';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class EditEmployeeComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;

  x: any;

  month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  formattedDate: any;
  formattedDate1: any;

  emp2: any;

  valueY: number = 0;

  formatLabel(value: number) {
    if (value >= 0) {
      return Math.round(value / 1) + 'Y';
    }
    this.valueY = value
    return value;
  }

  gridsize: any;
  updateSetting(event: any) {
    this.gridsize = event.value;
  }

  constructor(private formBuilder: FormBuilder, private store: Store, private snackBar: MatSnackBar, private employeedata: EmployeeDataService, private router: Router) {

    this.emp2 = this.employeedata.emp2

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: [this.emp2.title, Validators.required],
      firstName: [this.emp2.firstName, Validators.required],
      lastName: [this.emp2.lastName, Validators.required],
      gender: [this.emp2.gender, Validators.required],
      DOB: [this.emp2.DOB, Validators.required],
      maritialStatus: [this.emp2.maritialStatus, Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
      city: [this.emp2.city, Validators.required],
      // phone_numbers: ['', Validators.required],
      phone_numbers: [this.emp2.phone_numbers, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      position: [this.emp2.position, Validators.required],
      workFormat: [this.emp2.workFormat, Validators.required],
      qualification: [this.emp2.qualification, Validators.required],
      experience: [this.emp2.experience, Validators.required],
      // id: ['', Validators.required],
      DOJ: [this.emp2.DOJ, Validators.required],
      CTC: [this.emp2.CTC, Validators.required],
      // photo: ['', Validators.required],
      email: [this.emp2.email, [Validators.required, Validators.email]]

    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    let payload = {
      title: this.registerForm.value.title,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      gender: this.registerForm.value.gender,
      DOB: this.registerForm.value.DOB,
      maritialStatus: this.registerForm.value.maritialStatus,
      city: this.registerForm.value.city,
      phone_numbers: this.registerForm.value.phone_numbers,
      position: this.registerForm.value.position,
      workFormat: this.registerForm.value.workFormat,
      qualification: this.registerForm.value.qualification,
      experience: this.registerForm.value.experience,
      id: this.emp2.id,
      DOJ: this.registerForm.value.DOJ,
      CTC: this.registerForm.value.CTC,
      email: this.registerForm.value.email,
      photo: this.emp2.photo,
      country: 'India',
      DOB1: this.formattedDate,
      DOJ1: this.formattedDate1
    }

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    } else {
      this.store.dispatch(updateEmployee(payload))
      this.router.navigateByUrl('/dashboard')
      this.snackBar.open('New Employee Added', 'close')._dismissAfter(2000);

      // this.employeedata.editData(payload)
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
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
