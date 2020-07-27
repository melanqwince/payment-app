import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CardType } from './shared/interfaces/card-type.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }


  API_ADDRESS = 'https://www.mocky.io/v2';
  SUCCESS_CASE = this.API_ADDRESS + '/5d8de422310000b19d2b517a';
  FAILED_CASE = this.API_ADDRESS + '/5d8de441310000a2612b517c';


  getListOfCardTypes(): Observable<any> {
    return this.http.get(this.API_ADDRESS + '/5d145fa22f0000ff3ec4f030');
  }

  submitPayment(value): Observable<any> {
    console.log('submitted value', value);

    // simulate random success or failed case
    const status = Math.round(Math.random());
    return this.http.get(status ? this.SUCCESS_CASE : this.FAILED_CASE);
  }
}
