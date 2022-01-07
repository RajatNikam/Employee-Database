import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private search = new BehaviorSubject([]);
  rcvSearch = this.search.asObservable();

  constructor() { }

  sendSearch(searchWord: any) {
    this.search.next(searchWord);
    console.log(searchWord);
    
  }
}