import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toasterService: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
    // return next.handle(request).pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     let errorMsg = '';
    //     if (error.error instanceof ErrorEvent) {
    //       console.log('This is client side error');
    //       errorMsg = `Error: ${error.error.message}`;
    //     } else {
    //       this.toasterService.error(` ${error.error.reason ? error.error.reason : error.error}`);
    //       errorMsg = `Error Code: ${error.status},Message: ${error.error.reason}`;
    //     }
    //     return throwError({ status: error.status, message: error.error.reason, error: error.error})
    //   })
    // )
  }
}
