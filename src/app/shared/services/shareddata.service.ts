import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {

  constructor(private httpClient: HttpClient) { }

  public getAlarmsData() : Observable<any> {
    return this.httpClient.get("assets/data/alarmsInfo.json");
  }

}