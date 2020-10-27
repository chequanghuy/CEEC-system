import { Component, ViewChild, OnInit } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { MembersService } from '../../services/members.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  templateUrl: 'nowmembers.component.html',
  styleUrls: ['./nowmembers.component.css'],
  providers: [MembersService],
})
export class NowMembersComponent implements OnInit{
  @ViewChild('settingModal') public settingModal: ModalDirective;
  Members:any = [];
  addForm: FormGroup;
  searchForm: FormGroup;
  constructor(private _data : MembersService, private fb: FormBuilder) {
    this._data.getListMembers().subscribe((res: any)=>{
      this.Members = res;
      console.log(res);
    });
   }
   ngOnInit(): void {
    this.addForm = this.fb.group({
      Name: ['', [Validators.required]],
      Gender: this.fb.group({
        GenderVal: ['', Validators.required]
      }),
      Date: [''],
      MSSV: [''],
      SDT: [''],
      Facebook: [''],
      Role: this.fb.group({
        RoleVal: ['', Validators.required]
      }),
      UrlImage: ['']
    });
    this.searchForm = this.fb.group({
      Name: ['', [Validators.required]],
      MSSV: [''],
    })
  }
  addSubmit(): void {
    console.log(this.addForm.value);
    this._data.addMember(this.addForm.value).subscribe();
  }
  searchSubmit(): void {
    console.log(this.searchForm.value);
  }
}
