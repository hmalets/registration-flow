import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError, NEVER, Observable, throwError } from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        const {
          status,
          error: { message },
        } = errorResponse;
        if (status !== HttpStatusCode.BadRequest) {
          this.router.navigate(['error'], { state: { status, message } });
          return NEVER;
        }

        return throwError(() => errorResponse);
      }),
    );
  }
}
