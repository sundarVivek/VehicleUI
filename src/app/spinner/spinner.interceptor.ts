import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private _spinner: SpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._spinner.requestStarted();

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this._spinner.requestEnded();
          }
        },
        (error: HttpErrorResponse) => {
          this._spinner.resetSpinner();
          throw error; // Re-throw the error so that it can be handled by other parts of the application.
        }
      )
    );
  }
}
