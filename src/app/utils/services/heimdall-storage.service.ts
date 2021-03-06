import {Injectable} from '@angular/core';
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {HeimdallManagementConstants} from "../models/heimdall-management-constants";

@Injectable({
  providedIn: 'root'
})
export class HeimdallStorageService {

  constructor(
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService
  ) {
  }

  public storeAuthorizationToken(token: string) {
    this.storeIntoSession(HeimdallManagementConstants.AuthorizationToken, token);
  }

  public storeCurrentUrl(url: string) {
    this.storeIntoSession(HeimdallManagementConstants.CurrentUrl, url);
  }
  public getCurrentUrl():string{
    return this.sessionStorage.retrieve(HeimdallManagementConstants.CurrentUrl)
  }
  public clearStoredUrl(){
    this.sessionStorage.clear(HeimdallManagementConstants.CurrentUrl)
  }

  private storeIntoSession(key: HeimdallManagementConstants, value: string) {
    this.sessionStorage.store(key, value);
  }

  private storeIntoBrowser(key: HeimdallManagementConstants, value: string) {
    this.localStorage.store(key, value);
  }
}
