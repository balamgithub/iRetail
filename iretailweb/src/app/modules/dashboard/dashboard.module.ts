import { CommonModule } from '@angular/common';
import { dashboardRouting } from './dashboard.routing';
import { DashboardComponent } from './pages/dashboard/dashboard.page';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardService } from './service/dashboard.service';
import { DashboardDataAccess } from './dashboard.data';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [FormsModule,
    ReactiveFormsModule,
    dashboardRouting,
    CommonModule,
    ModalModule.forRoot()],
  providers: [
    DashboardService,
    DashboardDataAccess
  ],
  declarations: [DashboardComponent,

  ]
})
export class DashboardModule { }
