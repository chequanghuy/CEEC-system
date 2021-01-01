// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// import { AllDevicesComponent } from './alldevices.component';
import { ExhibitRoutingModule } from './exhibit-routing.module';

// import { DetailsComponent } from './details/details.component';
import { ModalModule } from 'ngx-bootstrap/modal';
// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

// Carousel Component
import { CarouselModule } from 'ngx-bootstrap/carousel';

// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Pagination Component
import { PaginationModule } from 'ngx-bootstrap/pagination';

// Popover Component
import { PopoverModule } from 'ngx-bootstrap/popover';


// Progress Component
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';


// Tooltip Component
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { OweComponent } from './owe.component';
import { LoanComponent } from './loan.component';
import { TicketComponent } from './ticket.component';
import { LoanDetailComponent } from './details/loan-detail.component';
import { OweDetailComponent } from './details/owe-detail.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExhibitRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule,
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    LoanComponent,
    OweComponent,
    LoanDetailComponent,
    OweDetailComponent,
    TicketComponent
  ]
})
export class ExhibitModule { }
