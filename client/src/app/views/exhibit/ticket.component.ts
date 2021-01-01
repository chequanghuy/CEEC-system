import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ExhibitsService } from '../../services/exhibits.service';
import { DevicesService } from '../../services/devices.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { from, Subscription } from 'rxjs';
import { Device } from '../../services/device';
@Component({
  templateUrl: "ticket.component.html",
  providers: [ExhibitsService, DevicesService]
  // styleUrls: ['./details.component.css']
})

export class TicketComponent implements OnInit{
  loanForm: FormGroup;
  searchForm: FormGroup;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _Exhibit: ExhibitsService,
    private _Device: DevicesService,
    private fb: FormBuilder
  ) {}
  sub: Subscription;
  deviceName: string;
  detail: any = [];
  deviceArray:Device[] = [];
  ngOnInit(): void {
    this.loanForm = this.fb.group({
      MSSV: ['', [Validators.required]],
      DateBegin: ['', [Validators.required]],
      DateEnd: ['', [Validators.required]],
    });
    this.searchForm = this.fb.group({
      Name: ['', [Validators.required]],
    });
    // this.sub = this._ActivatedRoute.paramMap.subscribe((params) => {
    //   this.deviceName = params.get("deviceName");
    //   console.log(this.deviceName);
    // //   this.detail = this._Exhibit.getsingleLoan(this.deviceName);
    //   console.log(this.detail);
    // });
  }
  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }
  loanSubmit():void {
    console.log(this.loanForm.value);
    this._Exhibit.addLoan({detail:this.loanForm.value, devices:this.deviceArray}).subscribe();
  }
  deleteDevice():void {
    
  }
  searchSubmit(){
    console.log('search');
    this._Device.searchListDevicesClass(this.searchForm.value).subscribe(res => {
      this.deviceArray = res;
    })
  }
  deviceAdd:Device[] = [];
  addDevice() {
    this.deviceArray.forEach(x => {
      if(x.checked)
        this.deviceAdd.push(x);
    })
    console.log(this.deviceAdd);
  }
  checkAllCheckBox(ev) {
		this.deviceArray.forEach(x => x.checked = ev.target.checked);
	}

	isAllCheckBoxChecked() {
		return this.deviceArray.every(p => p.checked);
	}
}
