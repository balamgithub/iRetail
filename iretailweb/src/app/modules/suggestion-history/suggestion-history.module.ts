import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './pages/history.page';
import { suggestionHistoryRouting } from './suggestion-history.routing';
import { DataTablesModule } from 'angular-datatables';
import { Daterangepicker } from 'ng2-daterangepicker';


@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    suggestionHistoryRouting,
    DataTablesModule,
    Daterangepicker
  ]
})
export class SuggestionHistoryModule { }
