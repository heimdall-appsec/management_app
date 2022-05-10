import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationConfigService {
  private _endpointPrefix = '';
  private _microFrontend = false;

  constructor() { }

  get endpointPrefix(): string {
    return this._endpointPrefix;
  }

  set endpointPrefix(value: string) {
    this._endpointPrefix = value;
  }

  get microFrontend(): boolean {
    return this._microFrontend;
  }

  set microFrontend(value: boolean) {
    this._microFrontend = value;
  }
  getEndpointFor(api:string, microservice?:string):string{
    if(microservice){
      return `${this.endpointPrefix}services/${microservice}/${api}`
    }
    return `${this.endpointPrefix}/${api}`;
  }
}
