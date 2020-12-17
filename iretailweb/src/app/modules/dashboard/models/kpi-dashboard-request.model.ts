    export class DashboardGraphKPIRequestModel {
        constructor(public TableSchema: string, public ReportType: string, public ReportModel: AuditKpiGoalConfigReportModel) {

        }
    }

    class AuditKpiGoalConfigReportModel {
        constructor(public UserID: number,
            public Flag: any,
            public FromDate: any,
            public ToDate: any) {
        }
    }
