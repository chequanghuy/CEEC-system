// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NowMembersComponent } from './nowmembers.component';
import { OldMembersComponent } from './oldmembers.component';
import { MembersRoutingModule } from './members-routing.module';
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
import { DetailsUserComponent } from './details/detailsuser.component';

// Tooltip Component
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MembersRoutingModule,
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
    NowMembersComponent,
    OldMembersComponent,
    DetailsUserComponent
  ]
})
export class MembersModule { }
