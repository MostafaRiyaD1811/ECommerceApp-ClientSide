import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          if (error.status === 400) {
            if (error.error == "User Not Found") {
              this.toastr.error("User not Found Please Check your credentials")
              console.log("object");
            }
            if (error.error.errors) {
              for (let err of error.error.errors) {
                this.toastr.error(err)

              }
              console.log(error.error.errors);

            } if (error.error.errors && error.error != "User Not Found") {
              for (let err of error.error) {
                this.toastr.error(err.description)
                console.log("object");
              }
            }

            // this.toastr.error("Sorry an Error Occured has Occured")
          }
          if (error.status === 401) {
            this.toastr.error("Sorry You are not authorized to enter")
          }
          if (error.status === 404) {
            this.router.navigateByUrl('/not-found')
          }
          if (error.status === 500) {
            const navExtra: NavigationExtras = { state: { error: error.error } }
            this.router.navigateByUrl('/server-error', navExtra)
          }
        }
        return throwError(error);
      })
    )
  }
}
