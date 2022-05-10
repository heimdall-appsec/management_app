import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {AccountService} from "../services/account.service";
import {HeimdallStorageService} from "../services/heimdall-storage.service";
import {Router} from "@angular/router";
import {LoginService} from "../services/login.service";

@Injectable()
export class AuthenticationExpiredInterceptor implements HttpInterceptor {

  constructor(
    private accountService:AccountService,
    private storageService:HeimdallStorageService,
    private router:Router,
    private loginService:LoginService

  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   return next.handle(request).pipe(
     tap({
       error: (err:HttpErrorResponse) => {
         if((err.status === 401 && err.url &&!err.url?.includes('api/account')) && this.accountService.isAuthenticated()){
           this.storageService.storeCurrentUrl(this.router.routerState.snapshot.url);
           this.loginService.login();
         }
       }
     })
   );
  }
}
