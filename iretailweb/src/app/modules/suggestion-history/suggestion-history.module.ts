import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './pages/history.page';
import { suggestionHistoryRouting } from './suggestion-history.routing';



@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    suggestionHistoryRouting
  ]
})
export class SuggestionHistoryModule { }
