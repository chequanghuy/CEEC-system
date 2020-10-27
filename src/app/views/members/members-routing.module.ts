import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NowMembersComponent } from './nowmembers.component';
import { OldMembersComponent } from './oldmembers.component';
import { DetailsUserComponent } from './details/detailsuser.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Members'
    },
    children: [
      {
        path: '',
        redirectTo: 'nowmembers'
      },
      {
        path: 'nowmembers',
        component: NowMembersComponent,
        data: {
          title: 'Nowmembers'
        }
      },
      {
        path: 'oldmembers',
        component: OldMembersComponent,
        data: {
          title: 'Oldmembers'
        }
      },
      {
        path: 'nowmembers/detail/:mssv',
        component: DetailsUserComponent,
        data: {
          title: "All Devices / Detail /"
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule {}
