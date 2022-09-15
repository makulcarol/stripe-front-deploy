import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BinService {
  baseURL: string = 'https://api.freebinchecker.com/bin/';

  constructor(private http: HttpClient) {}

  getInfos(cardNumbers: string): Observable<any> {
    return this.http.get(this.baseURL + cardNumbers);
  }
}
