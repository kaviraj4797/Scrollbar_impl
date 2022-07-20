import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(public http:HttpClient) { }

  getData():Observable<any>{
    return this.http.get<any>('https://dummyjson.com/products')
  };
}
