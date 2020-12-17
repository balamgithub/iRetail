import { DashboardReportModel } from './dashboard-report.model';

export class DashboardGraphRequestModel {
    constructor(public TableSchema: string, public ReportType: string, public ReportModel: DashboardReportModel) {

    }
}
