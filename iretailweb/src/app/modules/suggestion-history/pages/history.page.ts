import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subscription } from 'rxjs';
import { convertDateTimewithTime } from 'src/app/shared/custom.function';
import { SuggestionHistoryService } from '../suggestion-history.service';

@Component({
  selector: 'history',
  templateUrl: 'history.page.html'
})
export class HistoryComponent {
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;
  dtOptions: any = {};
  public daterange: any = {};
  public options: any = {
    locale: { format: 'MM/DD/YYYY' },
    alwaysShowCalendars: false,
  };
  constructor(private _suggestionService: SuggestionHistoryService) { }
  private dTable: any = {};
  subs: Subscription;

  selectedDate(value: any, datepicker?: any) {
    datepicker.start = value.start;
    datepicker.end = value.end;
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
    this._suggestionService.getApprovedSuggestionHistory(this.daterange.start.toDate().getTime(), this.daterange.end.toDate().getTime());
  }

  ngOnInit() {
    this.dtOptions = {
      aaData: [],
      'iDisplayLength': 10,
      'aLengthMenu': [[10, 15, 25, 50, -1], [10, 15, 25, 50, 'All']],
      aoColumns: [
        { sTitle: 'Message', mData: 'Message', sClass: 'text-left' },
        { sTitle: 'Approved By', mData: 'ApprovedBy', sClass: 'text-center' },
        { sTitle: 'Approved On', mData: 'ApprovedOn', sClass: 'text-center' }
      ],
      aoColumnDefs: [
        {
          'aTargets': [2],
          'mRender': function (data, type, row) {
            return typeof data !== 'undefined' && data !== null ? convertDateTimewithTime(data) : '';
          }
        },
      ]
    };

    this.subs = this._suggestionService.$suggestionHistory.subscribe(res => {
      this.dTable.clear();
      this.dTable.rows.add(res);
      this.dTable.draw();
    })
  }
  ngAfterViewInit() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      this.dTable = dtInstance;
      this._suggestionService.getApprovedSuggestionHistory(new Date().getTime(), new Date().getTime());
    });
  }


  ngOnDestory() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
