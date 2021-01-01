import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ExhibitsService } from '../../../services/exhibits.service';
import { DevicesService } from '../../../services/devices.service';
import { MembersService } from '../../../services/members.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { from, Subscription } from 'rxjs';
@Component({
  templateUrl: "loan-detail.component.html",
  providers:[ExhibitsService, DevicesService, MembersService],
  styleUrls: ['../exhibit.component.css']
})
export class LoanDetailComponent implements OnInit{
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
  loanName: string;
  detailLoan: any = [];
  detailDevice: any = [];
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
      this.loanName = params.get("number");
      console.log(this.loanName);
      this._ExhibitsService.getSingleLoan({loanID:this.loanName}).subscribe((res)=>{
        this.detailLoan = res[0];
        this.detailDevice = res;
        console.log(this.detailLoan);
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
    this._ExhibitsService.addReturn({loanID:this.detailLoan.loanID}).subscribe((res)=>{
      this._Router.navigate(['/exhibit/owe/owedetail/', this.detailLoan.loanID]);
    })
  }
}
