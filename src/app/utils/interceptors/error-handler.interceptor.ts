import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {EventManagerService, EventWithContent} from "../services/event-manager.service";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private eventManager: EventManagerService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (!(err.status === 401 && (err.message === '' || err.url?.includes('api/account')))) {
            this.eventManager.broadcast(new EventWithContent('HttpError', err));
          }
        }
      })
    );
  }
}
