import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

import { AllDevicesComponent } from './alldevices.component';
import { DeleteDevicesComponent } from './deletedevices.component';
// import { LoanComponent } from './loan.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Devices'
    },
    children: [
      {
        path: '',
        redirectTo: 'alldevices'
      },
      {
        path: 'alldevices',
        component: AllDevicesComponent,
        data: {
          title: 'All Devices'
        }
      },
      {
        path: 'alldevices/detail/:deviceID',
        component: DetailsComponent,
        data: {
          title: "All Devices / Detail /"
        }
      },
      {
        path: 'deletedevices',
        component: DeleteDevicesComponent,
        data: {
          title: 'Delete Devices'
        }
      },
      // {
      //   path: 'loan',
      //   component: LoanComponent,
      //   data: {
      //     title: 'Loan'
      //   }
      // },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule {}
