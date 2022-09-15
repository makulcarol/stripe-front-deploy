import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCardResponse } from 'src/app/models/creditCardResponse';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  baseURL: string = 'https://stripe-back.azurewebsites.net/stripe/check';

  constructor(private http: HttpClient) {}

  getInfosStripe(cardNumbers: any): Observable<CreditCardResponse[]> {
    return this.http.post<CreditCardResponse[]>(this.baseURL, cardNumbers);
  }
}
