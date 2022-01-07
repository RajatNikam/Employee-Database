import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpsService {

  // headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  // httpOptions = {
  //   headers: this.headers
  // }

  // url: string = "http://localhost:3000/ListOfEmployees"

  constructor(private http: HttpClient) { }

  //   PostService(url: any, data: any) {
  // return this.http.post('http://localhost:3000/ListOfEmployees', data)
  //   }

  PostService(url: any, data: any, token: boolean = false, headers: any) {

    return this.http.post(url, data, token && headers);
  }

  GetService(url: any, data: any) {

    return this.http.get(url, data);
  }

  PutService(url: any, data: any, token: boolean = false, headers: any) {

    return this.http.put(url, data, token && headers);
  }
  
  DeleteService(url: string, headers: any) {
    return this.http.delete(url, headers)
  }
}
