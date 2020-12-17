export class IDCWorkloadRequestModel {
    constructor(public TableSchema: string, public ReportType: string, public ReportModel: DashboardIDCWorkloadReportModel) {

    }
}

export class DashboardIDCWorkloadReportModel {
    constructor(public FromDate: any, public ToDate: any, public OCRReportType: any ) {

    }
}
