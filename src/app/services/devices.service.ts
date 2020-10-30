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
export class DevicesService {
  private url = Config.endPoint;
  constructor(private http: HttpClient) {}
  public getListDevicesWatering(): Observable<unknown> {
    return this.http.get<unknown>(this.url + 'electronicIrrigationSystem');
  }
  public getDeviceWateringByID(ID: unknown): Observable<unknown> {
    return this.http.get<unknown>(
      this.url + 'electronicIrrigationSystem/' + ID
    );
  }
  public getsingleDevice(deviceName) {
    let devices = [
      {
        roomID: 1,
        deviceID: 2,
        name: 'Đèn 1',
        status: 'on'
      }
    ];
    // console.log('RoomID = ' + roomID);
    return devices;
  }
  // public getListDevices() {
  //   let devices = [
  //     {
  //       name: 'Bàn ủi',
  //       feature: 'Ủi mạch',
  //       available: 'Không',
  //       status: 'Tốt',
  //     },
  //     {
  //       name: 'Hàn 1',
  //       feature: 'Hàn mạch',
  //       available: 'Có',
  //       status: 'Tốt',
  //     },
  //     {
  //       name: 'Hàn 2',
  //       feature: 'Hàn mạch',
  //       available: 'Có',
  //       status: 'Tốt',
  //     },
  //     {
  //       name: 'Hàn 3',
  //       feature: 'Hàn mạch',
  //       available: 'Không',
  //       status: 'Tốt',
  //     },
  //     {
  //       name: 'Khoan 1',
  //       feature: 'Khoan mạch',
  //       available: 'Có',
  //       status: 'Tốt',
  //     },
  //     {
  //       name: 'Khoan 2',
  //       feature: 'Khoan mạch',
  //       available: 'Có',
  //       status: 'Tốt',
  //     },
  //     {
  //       name: 'Dao cắt 1',
  //       feature: 'Cắt mạch',
  //       available: 'Có',
  //       status: 'Tốt',
  //     },
  //   ];
  //   // console.log('RoomID = ' + roomID);
  //   return devices;
  //   // return this.http.get<unknown>(
  //   //     this.url + 'electronicIrrigationSystem/' 
  //   //   );
  // }
  public addDevice(data : unknown):Observable<unknown>{
    return this.http.post<unknown>(this.url + 'addDevice', data);
  }
  public getCountDevices():Observable<unknown>{
    return this.http.post<unknown>(this.url + 'getCountDevices','');
  }
  public getListDevices(data: unknown):Observable<unknown>{
    return this.http.post<unknown>(this.url + 'getListDevices',data);
  }
  public searchListDevicesClass(data: unknown):Observable<Device[]>{
    return this.http.post<Device[]>(this.url + 'searchListDevices',data);
  }
  public searchListDevices(data: unknown):Observable<unknown>{
    return this.http.post<unknown>(this.url + 'searchListDevices',data);
  }
  public getSingleDevice(data: unknown):Observable<unknown>{
    return this.http.post<unknown>(this.url + 'getSingleDevice',data);
  }
  public updateDevice(data: unknown):Observable<unknown>{
    return this.http.post<unknown>(this.url + 'updateDevice',data);
  }
  public deleteDevice(data: unknown):Observable<unknown>{
    return this.http.post<unknown>(this.url + 'deleteDevice',data);
  }
  public addLoanDetail(data: unknown):Observable<unknown>{
    return this.http.post<unknown>(this.url + 'addLoanDetail',data);
  }
}
