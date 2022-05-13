import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }
  getCurrentClientDateInUTC(){
    return new Date().toISOString();
  }
  convertUTCDateToClientTimezone(timestamp:string){
    return new Date(timestamp).toLocaleDateString();
  }
}
