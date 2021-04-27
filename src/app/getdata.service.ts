import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  private URL  = "https://api.hatchways.io/assessment/students"

  constructor(
    private http: HttpClient
  ) { }


  getData() : Observable<any>{
    return this.http.get(this.URL, {responseType: 'json'})
  }

}
