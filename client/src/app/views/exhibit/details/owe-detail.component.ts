import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ExhibitsService } from '../../../services/exhibits.service';
import { DevicesService } from '../../../services/devices.service';
import { MembersService } from '../../../services/members.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { from, Subscription } from 'rxjs';
@Component({
  templateUrl: "owe-detail.component.html",
  providers:[ExhibitsService, DevicesService, MembersService],
  styleUrls: ['../exhibit.component.css']
})
export class OweDetailComponent implements OnInit{
  settingForm: FormGroup;
  loanForm: FormGroup;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _ExhibitsService: ExhibitsService,
    private _DevicesService:  DevicesService,
    private _MembersService: MembersService,
    private fb: FormBuilder
  ) {}
  sub: Subscription;
  returnID: string;
  detailLoan: any = [];
  detailDevice: any = [];
  detailReturn: any;
  ngOnInit(): void {
    this.settingForm = this.fb.group({
      Name: ['', [Validators.required]],
      Feature: [''],
      Owner: ['', [Validators.required]],
      Description: [''],
      Status: this.fb.group({
        statusVal: ['', Validators.required]
      }),
      UrlImage: ['']
    });
    this.loanForm = this.fb.group({
      Name: ['', [Validators.required]],
      MSSV: ['', [Validators.required]],
      SDT: ['', [Validators.required]]
    });
    this.sub = this._ActivatedRoute.paramMap.subscribe((params) => {
      this.returnID = params.get("number");
      console.log(this.returnID);
      this._ExhibitsService.getSingleReturn({returnID:this.returnID}).subscribe((res)=>{
        this.detailReturn = res[0];
        console.log(res);
        this._ExhibitsService.getSingleLoan({loanID:this.detailReturn.loanID}).subscribe((res1)=>{
          this.detailLoan = res1[0];
          this.detailDevice = res1;
        })
      });
      
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  settingSubmit():void {
    console.log(this.settingForm.value);
  }
  loanSubmit():void {
    console.log(this.loanForm.value);
  }
  deleteloan():void {
    
  }
  addReturn(){
    // this._ExhibitsService.addReturn({loanID:this.detailReturn.loanID}).subscribe((res)=>{
    //   this._Router.navigate(['/exhibit/owe/owedetail/', this.detailReturn.loanID]);
    // })
    this._ExhibitsService.updateStatusReturn({returnID:this.detailReturn.returnID}).subscribe((res)=>{
      this._ExhibitsService.getSingleReturn({returnID:this.returnID}).subscribe((res1)=>{
        this.detailReturn = res1[0];
        console.log(res1);
      });
    });
  }
}
