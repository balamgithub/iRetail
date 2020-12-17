export class IDCWorkloadDrillDownGridRequestModel {
    constructor(public TableSchema: string, public ReportType: string, public ReportModel: DashboardIDCWorkloadDrillDownGridReportModel) {

    }
}

export class DashboardIDCWorkloadDrillDownGridReportModel {
    constructor(public AuditMontYear: any, public LoanID: any ) {

    }
}
