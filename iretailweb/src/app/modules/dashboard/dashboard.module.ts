import { CommonModule } from '@angular/common';
import { dashboardRouting } from './dashboard.routing';
import { DashboardComponent } from './pages/dashboard/dashboard.page';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardService } from './service/dashboard.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Daterangepicker } from 'ng2-daterangepicker';
import { NgBusyModule } from 'src/app/shared/plugin/angularbusy/ng-busy.module';

@NgModule({
  imports: [FormsModule,
    ReactiveFormsModule,
    dashboardRouting,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,    
    Daterangepicker,
    NgBusyModule,
    ModalModule.forRoot()],
  providers: [
    DashboardService
  ],
  declarations: [DashboardComponent,

  ]
})
export class DashboardModule { }
