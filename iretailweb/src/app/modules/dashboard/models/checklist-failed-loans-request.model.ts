export class ChecklistFailedLoansRequestModel {
    constructor(public TableSchema: string, public ReportType: string, public ReportModel: ChecklistReportModel) {

    }
}

class ChecklistReportModel {
    BarType: string;
    CustomerID: number;
    LoanTypeID: number;
    ReviewTypeID: number;
    UserID: number;
    AuditMontYear: string;
    FromDate: string;
    ToDate: string;
    IsAuditMonthSearch = true;
    UserName = '';
    CategoryName = '';
    StipulationType: number;
    RuleStatus: number;
}
