import {HttpParams} from "@angular/common/http";

export const createRequestOptions = (req?:any):HttpParams => {
  let options:HttpParams = new HttpParams();
  if(req) {
    Object.keys(req).forEach(key => {
      if (key !== 'sort') {
        options = options.set(key, req[key])
      }
    });

    if (req.sort) {
      req.sort.forEach((val: string) => {
        options = options.append('sort', val)
      });
    }
    return options;
  }
}
