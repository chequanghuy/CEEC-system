/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../config/config';
@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private url = Config.endPoint;
  constructor(private http: HttpClient) {}

  public addMember(data : unknown):Observable<unknown>{
    return this.http.post<unknown>(this.url + 'addMember', data);
  }
  public getCountMembers():Observable<unknown>{
    return this.http.post<unknown>(this.url + 'getCountMembers','');
  }
  public getListMembers():Observable<unknown>{
    return this.http.post<unknown>(this.url + 'getListMembers','');
  }
  public getSingleMember(data: unknown):Observable<unknown>{
    return this.http.post<unknown>(this.url + 'getSingleMember',data);
  }
  public updateMember(data: unknown):Observable<unknown>{
    return this.http.post<unknown>(this.url + 'updateMember',data);
  }
  public deleteMember(data: unknown):Observable<unknown>{
    return this.http.post<unknown>(this.url + 'deleteMember',data);
  }
  public addLoanDetail(data: unknown):Observable<unknown>{
    return this.http.post<unknown>(this.url + 'addLoanDetail',data);
  }
}
