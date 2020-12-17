import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class DashboardCommonServiceModel {
    ReviewTypeID: number;
    AuditMonthYear: any;
    FromDate: any;
    ToDate: any;
    checklistitemResult: any;
}
