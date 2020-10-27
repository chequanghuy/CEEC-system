import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MembersService } from '../../../services/members.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { from, Subscription } from 'rxjs';
@Component({
  templateUrl: "detailsuser.component.html",
  styleUrls: ['detailsuser.component.css'],
  providers: [MembersService]
})
export class DetailsUserComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _MembersService: MembersService,
    private fb: FormBuilder
  ) { }
  settingForm: FormGroup;
  sub: Subscription;
  memberID: string;
  detail: any = [];
  ngOnInit(): void {
    this.settingForm = this.fb.group({
      Name: ['', [Validators.required]],
      Gender: this.fb.group({
        GenderVal: ['', Validators.required]
      }),
      Date: [''],
      MSSV: [{value:'', disabled: true}],
      SDT: [''],
      Facebook: [''],
      Role: this.fb.group({
        RoleVal: ['', Validators.required]
      }),
      UrlImage: ['']
    });
    this.sub = this._ActivatedRoute.paramMap.subscribe((params) => {
      this.memberID = params.get("mssv");
      console.log(this.memberID);
      this._MembersService.getSingleMember({mssv:this.memberID}).subscribe((res: any) => {
        this.detail = res[0];
        console.log(this.detail);
        this.detail.birthday = this.detail.birthday.split('T')[0];
        this.settingForm.setValue({
          Name: this.detail.name,
          Gender: {
            GenderVal: this.detail.gender.toString() 
          },
          Date: this.detail.birthday,
          MSSV: this.detail.mssv,
          SDT: this.detail.sdt,
          Facebook: this.detail.facebook,
          Role: {
            RoleVal: this.detail.role.toString()
          },
          UrlImage: this.detail.image
        })
        console.log(this.settingForm.value);
      });

    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  onBack(): void {
    this._Router.navigate(["room"]);
  }
  settingSubmit(): void {
    this._MembersService.updateMember(this.settingForm.value).subscribe();
  }
  deleteMember(): void {
    this._MembersService.deleteMember({mssv: this.memberID}).subscribe(
      (res)=>{
        this._Router.navigate(["/members/nowmembers"]);
      }
    );
  }
}
