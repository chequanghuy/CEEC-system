import { Component, ViewChild, OnInit } from '@angular/core';
import { ExhibitsService } from '../../services/exhibits.service'
import {ModalDirective} from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  templateUrl: 'loan.component.html',
  styleUrls: ['exhibit.component.css'],
  providers: [ExhibitsService]
})
export class LoanComponent implements OnInit{
  @ViewChild('settingModal') public settingModal: ModalDirective;
  Loans:any = [];
  countLoans: any;
  addForm: FormGroup;
  searchForm: FormGroup;
  constructor(private _data : ExhibitsService, private fb: FormBuilder, private _Router: Router) { 
    this._data.getCountLoans().subscribe((res: any) => {
      this.countLoans = Array(Math.floor(parseInt(res.count)/7) + 1).fill(1).map((x,i)=>i);
      console.log(this.countLoans);
    })
    this._data.getListLoans({begin : 7, end: 0}).subscribe((res: any) => {
      console.log(res);
      this.Loans = res;
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
    this._data.getListLoans({begin : begin, end: end}).subscribe((res: any) => {
      console.log(res);
      this.Loans = res;
    });
  }
  addSubmit(): void {
    // console.log(this.addForm.value);
    // this._data.addLoan(this.addForm.value).subscribe();
    this._Router.navigate(['/exhibit/ticket']);
  }
  searchSubmit(): void {
    console.log(this.searchForm.value);
  }
  DeleteLoans(): void {
    this._Router.navigate(["Loans/deleteLoans"]);
  }
  onRefresh(): void {
    this.itemSelected = 0;
    this._data.getCountLoans().subscribe((res: any) => {
      this.countLoans = Array(Math.floor(parseInt(res.count)/7) + 1).fill(1).map((x,i)=>i);
      console.log(this.countLoans);
    })
    this._data.getListLoans({begin : 7, end: 0}).subscribe((res: any) => {
      console.log(res);
      this.Loans = res;
    });
  }
}
