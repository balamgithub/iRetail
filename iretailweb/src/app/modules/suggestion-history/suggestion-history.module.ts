import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './pages/history.page';
import { suggestionHistoryRouting } from './suggestion-history.routing';
import { DataTablesModule } from 'angular-datatables';
import { Daterangepicker } from 'ng2-daterangepicker';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { SuggestionHistoryService } from './suggestion-history.service';


@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    suggestionHistoryRouting,
    DataTablesModule,
    Daterangepicker,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [
    SuggestionHistoryService
  ]
})
export class SuggestionHistoryModule { }
