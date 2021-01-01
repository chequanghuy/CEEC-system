import { Component, ViewChild, OnInit } from '@angular/core';
import { DevicesService } from '../../services/devices.service'
import {ModalDirective} from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  templateUrl: 'deletedevices.component.html',
  providers: [DevicesService],
  styleUrls: ['alldevices.component.css']
})
export class DeleteDevicesComponent implements OnInit{
  @ViewChild('settingModal') public settingModal: ModalDirective;
  devices:any = [];
  addForm: FormGroup;
  searchForm: FormGroup;
  constructor(private _data : DevicesService, private fb: FormBuilder) { 
    // this._data.getListDevices().subscribe((res: any) => {
    //   this.devices = res.data;
    // });
    // this.devices = this._data.getListDevices();
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
      Name: ['', [Validators.required]],
      Feature: [''],
      Owner: ['', [Validators.required]],
      Status: this.fb.group({
        statusVal: ['', Validators.required]
      }),
    })
  }
  addSubmit(): void {
    console.log(this.addForm.value);
  }
  searchSubmit(): void {
    console.log(this.searchForm.value);
  }
}
