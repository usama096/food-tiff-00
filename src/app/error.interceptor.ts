import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toasterService: ToastrService, private spinnerService: NgxSpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request) {
      this.spinnerService.show();
    }
    return next.handle(request).pipe(
      tap((res: any) => {
        if (res.status == 200 || res.status == 201) {
          this.spinnerService.hide();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('This is client side error');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          let message: string = 'Something went wrong!';
          if (error?.error?.message) {
            if (Array.isArray(error.error.message)) {
              message = error.error.message[0]
            } else {
              message = error.error.message;
            }
          }
          this.toasterService.error(message, 'Error');
        }
        this.spinnerService.hide();
        return throwError(error);

      })
    )
  }
}
