import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpsService } from './https.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  private source = new BehaviorSubject<any>("default message");
  currentmessage = this.source.asObservable();

  emp: any;
  emp2: any;
  url: string = 'http://localhost:3000/ListOfEmployees'

  constructor(private http: HttpClient, private https: HttpsService, private router: Router) { }

  getData() {
    return this.http.get('http://localhost:3000/ListOfEmployees')
  }

  addData(data: any) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.https.PostService('http://localhost:3000/ListOfEmployees', data, false, options)
  }

  editData(data: any) {
    console.log('service => editData (1)');

    let id = localStorage.getItem('id')
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.https.PutService(`${this.url}/${id}`, data, false, options)
  }

  changemessage(message: any) {
    this.source.next(message)
  }

  details(employe: any) {
    this.source.next(employe)
    console.log(employe);

    this.emp = employe
    console.log(this.emp);
  }

  deleteData(id: any) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.https.DeleteService(`${this.url}/${id}`, options)
  }

  redirectTo(url: string): void {
    this.router.navigateByUrl('/').then(() => {
      this.router.navigate([url]);
    });
  }

  edit(employe: any) {
    this.emp2 = employe
    console.log('service => edit');

  }

  getphoto() {
    return this.http.get('http://localhost:3000/photo')
  }

}