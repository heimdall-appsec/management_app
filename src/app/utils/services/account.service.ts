import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApplicationConfigService} from "./application-config.service";
import {LoginService} from "./login.service";
import {Observable, ReplaySubject, tap} from "rxjs";
import {Account} from "../models/account";
import {EventManagerService} from "./event-manager.service";
import {HeimdallStorageService} from "./heimdall-storage.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  userIdentity: Account | null = null;
  authenticationState$ = new ReplaySubject(1);
  accountCache?: Observable<Account> | null;


  constructor(
    private http: HttpClient,
    private applicationConfiguration: ApplicationConfigService,
    private storageService: HeimdallStorageService,
    private loginService: LoginService,
    private eventManager: EventManagerService,
    private router: Router
  ) {
  }

  fetch(): Observable<Account> {
    return this.http.get<Account>(this.applicationConfiguration.getEndpointFor('api/account'));
  }

  authenticate(identity: Account | null) {
    this.userIdentity = identity;
    this.authenticationState$.next(this.userIdentity);
    if (!identity) {
      this.accountCache = null;
    }
  }

  private navigateToStoredURL() {
    const previousUrl = this.storageService.getCurrentUrl();
    if (previousUrl) {
      this.storageService.clearStoredUrl();
      this.router.navigateByUrl(previousUrl);
    }
  }

  isAuthenticated(): boolean {
    return this.userIdentity !== null;

  }


}
