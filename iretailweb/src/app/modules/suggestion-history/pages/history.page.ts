import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.css']
})
export class HistoryComponent {
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;
  dtOptions: any = {};
  public daterange: any = {};
  public options: any = {
    locale: { format: 'MM/DD/YYYY' },
    alwaysShowCalendars: false,
  };
  constructor(private router: Router) { }
  private dTable: any = {};
  selectedDate(value: any, datepicker?: any) {
    datepicker.start = value.start;
    datepicker.end = value.end;
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
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
      ]
    };
  }
  ngAfterViewInit() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      this.dTable = dtInstance;
    });
  }
}
