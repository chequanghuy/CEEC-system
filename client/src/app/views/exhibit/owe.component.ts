import { Component, ViewChild, OnInit } from '@angular/core';
import { ExhibitsService } from '../../services/exhibits.service'
import {ModalDirective} from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  templateUrl: 'owe.component.html',
  styleUrls: ['exhibit.component.css'],
  providers: [ExhibitsService]
})
export class OweComponent implements OnInit{
  @ViewChild('settingModal') public settingModal: ModalDirective;
  Returns:any = [];
  countReturns: any;
  addForm: FormGroup;
  searchForm: FormGroup;
  constructor(private _data : ExhibitsService, private fb: FormBuilder, private _Router: Router) { 
    this._data.getCountReturns().subscribe((res: any) => {
      this.countReturns = Array(Math.floor(parseInt(res.count)/7) + 1).fill(1).map((x,i)=>i);
      console.log(this.countReturns);
    })
    this._data.getListReturns({begin : 7, end: 0}).subscribe((res: any) => {
      console.log(res);
      this.Returns = res;
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
      Name: ['', [Validators.required]],
      Feature: [''],
      Owner: ['', [Validators.required]],
      Status: this.fb.group({
        statusVal: ['', Validators.required]
      }),
    })
  }
  itemSelected: number = 0;
  changePage(begin, end, i): void {
    this.itemSelected = i;
    this._data.getListReturns({begin : begin, end: end}).subscribe((res: any) => {
      console.log(res);
      this.Returns = res;
    });
  }
  addSubmit(): void {
    // console.log(this.addForm.value);
    // this._data.addLoan(this.addForm.value).subscribe();
    // this._Router.navigate(['/exhibit/ticket']);
  }
  searchSubmit(): void {
    console.log(this.searchForm.value);
  }
  DeleteReturns(): void {
    // this._Router.navigate(["Returns/deleteReturns"]);
  }
  onRefresh(): void {
    this.itemSelected = 0;
    this._data.getCountReturns().subscribe((res: any) => {
      this.countReturns = Array(Math.floor(parseInt(res.count)/7) + 1).fill(1).map((x,i)=>i);
      console.log(this.countReturns);
    })
    this._data.getListReturns({begin : 7, end: 0}).subscribe((res: any) => {
      console.log(res);
      this.Returns = res;
    });
  }
}
