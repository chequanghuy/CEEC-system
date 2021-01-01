import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

import { OweComponent } from './owe.component';
import { LoanComponent } from './loan.component';
import { TicketComponent } from './ticket.component';
import { LoanDetailComponent } from './details/loan-detail.component';
import { OweDetailComponent } from './details/owe-detail.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Exhibits'
    },
    children: [
      {
        path: '',
        redirectTo: 'loan'
      },
      {
        path: 'loan',
        component: LoanComponent,
        data: {
          title: 'Loan'
        }
      },
      {
        path: 'loan/loandetail/:number',
        component: LoanDetailComponent,
        data: {
          title: "Exhibit / Loan Detail /"
        }
      },
      {
        path: 'owe',
        component: OweComponent,
        data: {
          title: 'Fine'
        }
      },
      {
        path: 'owe/owedetail/:number',
        component: OweDetailComponent,
        data: {
          title: "Exhibit / Owe Detail /"
        }
      },
      {
        path: 'ticket',
        component: TicketComponent,
        data: {
          title: 'Ticket'
        }
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExhibitRoutingModule {}
