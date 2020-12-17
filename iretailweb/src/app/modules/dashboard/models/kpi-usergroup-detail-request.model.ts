export class KPIUserGroupDetailRequestModel {
    constructor(public TableSchema: string, public ReportType: string, public ReportModel: KpiUserGroupReportModel) {

    }
}

class KpiUserGroupReportModel {
    constructor(public UserID: number) {
    }
}
