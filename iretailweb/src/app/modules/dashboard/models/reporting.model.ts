
export class ReportServiceModel {
    ReportType: string;
    ReportDescription: string;
    ReportModel: ReportModel = new ReportModel();
    DataEntryWorkLoadReportModel: DataEntryWorkLoadReportModel = new DataEntryWorkLoadReportModel();
}

class ReportModel {
    BarType: string;
    CustomerID: number;
    LoanTypeID: number;
    ReviewTypeID: number;
    UserID: number;
    RoleID: any;
    AuditMontYear: string;
    FromDate: string;
    ToDate: string;
    IsAuditMonthSearch = true;
    UserName = '';
    CategoryName = '';
    StipulationType: number;
    RuleStatus: number;
}

class DataEntryWorkLoadReportModel {
    UserID: number;
    AuditMontYear: string;
}
