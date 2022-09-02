import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, finalize, Observable } from 'rxjs';

import { RegistrationField, RegistrationRequest } from '../interfaces';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistrationApiService {
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getRegistrationFormFields(): Observable<RegistrationField[]> {
    this.loading$.next(true);
    return this.http
      .get<RegistrationField[]>(`${this.apiUrl}/registration/form`)
      .pipe(finalize(() => this.loading$.next(false)));
  }

  public register(body: RegistrationRequest): Observable<any> {
    this.loading$.next(true);
    return this.http
      .post<RegistrationRequest>(`${this.apiUrl}/registration`, body)
      .pipe(finalize(() => this.loading$.next(false)));
  }
}
