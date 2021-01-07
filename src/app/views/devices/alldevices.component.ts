import { Component, ViewChild, OnInit } from '@angular/core';
import { DevicesService } from '../../services/devices.service'
import {ModalDirective} from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  templateUrl: 'alldevices.component.html',
  providers: [DevicesService],
  styleUrls: ['alldevices.component.css']
})
export class AllDevicesComponent implements OnInit{
  @ViewChild('settingModal') public settingModal: ModalDirective;
  devices:any = [];
  countDevices: any;
  addForm: FormGroup;
  searchForm: FormGroup;
  constructor(private _data : DevicesService, private fb: FormBuilder, private _Router: Router) { 
    this._data.getCountDevices().subscribe((res: any) => {
      this.countDevices = Array(Math.floor(parseInt(res.count)/7.5) + 1).fill(1).map((x,i)=>i);
      console.log(this.countDevices);
    })
    this._data.getListDevices({begin : 7, end: 0}).subscribe((res: any) => {
      console.log(res);
      this.devices = res;
    });
  }
  ngOnInit(): void {
    this.addForm = this.fb.group({
      Name: ['', [Validators.required]],
      Feature: [''],
      Owner: ['', [Validators.required]],
      Description: [''],
      Status: this.fb.group({
        statusVal: ['', Validators.required]
      }),
      UrlImage: ['']
    });
    this.searchForm = this.fb.group({
      Name: ['', [Validators.required]]
    })
  }
  itemSelected: number = 0;
  changePage(begin, end, i): void {
    this.itemSelected = i;
    this._data.getListDevices({begin : begin, end: end}).subscribe((res: any) => {
      console.log(res);
      this.devices = res;
    });
  }
  addSubmit(): void {
    console.log(this.addForm.value);
    this._data.addDevice(this.addForm.value).subscribe();
  }
  searchSubmit(): void {
    console.log(this.searchForm.value);
    this._data.searchListDevices(this.searchForm.value).subscribe(res => this.devices = res)
  }
  DeleteDevices(): void {
    this._Router.navigate(["devices/deletedevices"]);
  }
  onRefresh(): void {
    this.itemSelected = 0;
    this._data.getCountDevices().subscribe((res: any) => {
      this.countDevices = Array(Math.floor(parseInt(res.count)/7) + 1).fill(1).map((x,i)=>i);
      console.log(this.countDevices);
    })
    this._data.getListDevices({begin : 7, end: 0}).subscribe((res: any) => {
      console.log(res);
      this.devices = res;
    });
  }
}
