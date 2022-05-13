import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ApplicationConfigService} from "../application-config.service";
import {Pagination} from "../../models/pagination";
import {Observable} from "rxjs";
import {IUser} from "../../models/entities/user-entity";
import {createRequestOptions} from "../../utility/request-util";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private resourceUrl = this.applicationConfiguration.getEndpointFor('api/users');
  constructor(
    private http:HttpClient,
    private applicationConfiguration:ApplicationConfigService
  ) { }
  query(req?:Pagination):Observable<HttpResponse<IUser>>{
    const options = createRequestOptions(req);
    return this.http.get<IUser>(this.resourceUrl,{params: options,observe:'response'});
  }

}
