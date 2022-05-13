import { Injectable } from '@angular/core';
import {ApplicationConfigService} from "./application-config.service";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private applicationConfiguration: ApplicationConfigService,
    private location: Location
  ) {
  }

  login() {
    location.href = `${location.origin}/${this.location.prepareExternalUrl('/oauth2/authorization/oidc')}`
  }
  logout(){

  }
}

