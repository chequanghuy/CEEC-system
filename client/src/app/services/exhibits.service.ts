/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../config/config';
import { Device } from './device'
@Injectable({
  providedIn: 'root'
})
export class ExhibitsService {
  private url = Config.endPoint;
  constructor(private http: HttpClient) {}

  public addLoan(data : unknown):Observable<unknown>{
    return this.http.post<unknown>(this.url + 'addLoan', data);
  }
  public getCountLoans():Observable<unknown>{
    return this.http.post<unknown>(this.url + 'getCountLoans','');
  }
  public getListLoans(data: unknown):Observable<unknown>{
    return this.http.post<unknown>(this.url + 'getListLoans',data);
  }
  public getSingleLoan(data: unknown):Observable<unknown>{
    return this.http.post<unknown>(this.url + 'getSingleLoan',data);
  }
  public updateLoan(data: unknown):Observable<unknown>{
    return this.http.post<unknown>(this.url + 'updateLoan',data);
  }
  public deleteLoan(data: unknown):Observable<unknown>{
    return this.http.post<unknown>(this.url + 'deleteLoan',data);
  }
  public addLoanDetail(data: unknown):Observable<unknown>{
    return this.http.post<unknown>(this.url + 'addLoanDetail',data);
  }

  public getListDevices(data: unknown):Observable<Device[]>{
    return this.http.post<Device[]>(this.url + 'getListDevices',data);
  }
  public addReturn(data : unknown):Observable<unknown>{
    return this.http.post<unknown>(this.url + 'addReturn', data);
  }
  public getListReturns(data : unknown):Observable<unknown>{
    return this.http.post<unknown>(this.url + 'getListReturns', data);
  }
  public getCountReturns():Observable<unknown>{
    return this.http.post<unknown>(this.url + 'getCountReturns','');
  }
  public getSingleReturn(data: unknown):Observable<unknown>{
    return this.http.post<unknown>(this.url + 'getSingleReturn',data);
  }
  public updateStatusReturn(data: unknown):Observable<unknown>{
    return this.http.post<unknown>(this.url + 'updateStatusReturn',data);
  }
}
