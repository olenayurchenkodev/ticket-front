import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class TokenCardService {

  constructor(
    private http: HttpClient
  ) {}

  sendPayment(token: string, amount: number): Observable<any> {
    return this.http.post(`http://localhost:3001/stripe/payment`, {token, amount})
  }

  getListOfTickets(): Observable<any>{
    return this.http.get(`http://localhost:3001/tickets-list`)

  }
}
