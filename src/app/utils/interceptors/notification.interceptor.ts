import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpEventType, HttpResponse
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event:HttpEvent<any>) => {
        if(event instanceof HttpResponse){

        }
      })
    );
  }
}
