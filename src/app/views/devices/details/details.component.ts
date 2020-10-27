import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DevicesService } from '../../../services/devices.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { from, Subscription } from 'rxjs';
@Component({
  templateUrl: "details.component.html",
  styleUrls: ['details.component.css']
})
export class DetailsComponent implements OnInit{
  settingForm: FormGroup;
  loanForm: FormGroup;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _DevicesService: DevicesService,
    private fb: FormBuilder
  ) {}
  sub: Subscription;
  deviceID : string;
  detail: any = [];
  ngOnInit(): void {
    this.settingForm = this.fb.group({
      Name: [this.detail.name, [Validators.required]],
      Feature: [this.detail.feature],
      Owner: [this.detail.owner, [Validators.required]],
      Description: [this.detail.description],
      Status: this.fb.group({
        statusVal: [this.detail.status, Validators.required]
      }),
      UrlImage: [this.detail.image]
    });
    this.loanForm = this.fb.group({
      Name: ['', [Validators.required]],
      MSSV: ['', [Validators.required]],
      SDT: ['', [Validators.required]]
    });
    this.sub = this._ActivatedRoute.paramMap.subscribe((params) => {
      this.deviceID  = params.get("deviceID");
      console.log(this.deviceID );
      this._DevicesService.getSingleDevice({deviceID:this.deviceID}).subscribe((res:any)=>{
        this.detail = res[0];
        console.log(res[0]);
        this.settingForm.setValue({
          Name:this.detail.name,
          Feature:this.detail.feature,
          Owner : this.detail.owner,
          Description: this.detail.description,
          Status : {statusVal:this.detail.status},
          UrlImage:this.detail.image
        });
      });
      
    });
    
    
    
  }
  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }
  settingSubmit():void {
    console.log(this.settingForm.value);
    this._DevicesService.updateDevice(this.settingForm.value).subscribe();
  }
  loanSubmit():void {
    console.log(this.loanForm.value);
    this.loanForm.value.deviceID = this.deviceID;
    this._DevicesService.addLoanDetail(this.loanForm.value).subscribe();
  }
  deleteDevice():void {
    this._DevicesService.deleteDevice({deviceID : this.deviceID}).subscribe((res)=>{
      this._Router.navigate(['/devices/alldevices']);
    });
  }
}
