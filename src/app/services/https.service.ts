import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpsService {

  constructor(private http: HttpClient) { }

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
