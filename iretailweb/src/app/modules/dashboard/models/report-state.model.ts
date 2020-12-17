export class ReportStateModel {
    MissingDoc: ReportStateBaseModel = new ReportStateBaseModel();
    TopOfTheHouse: ReportStateBaseModel = new ReportStateBaseModel();
    DocRetention: ReportStateBaseModel = new ReportStateBaseModel();
    DataWorkloadEntry: DataWorkloadEntry = new DataWorkloadEntry();
    OCRExtractionReport: OCRExtractionReport = new OCRExtractionReport();
    MissingRecordedLoans: ReportStateBaseModel = new ReportStateBaseModel();
    CheckListFailedLoans: ReportStateBaseModel = new ReportStateBaseModel();
    LoanStipulation: ReportStateBaseModel = new ReportStateBaseModel();
    LoanFailedRules: ReportStateBaseModel = new ReportStateBaseModel();
    CriticalRulesFailed: ReportStateBaseModel = new ReportStateBaseModel();
    DataEntryWorkLoad: ReportStateBaseModel = new ReportStateBaseModel();
}

class ReportStateBaseModel {
    Data: any;
    OnLoad: boolean;
    SelectedDate: any;
}

class OCRExtractionReport extends ReportStateBaseModel {
    CustomerID: any;
    FromDate: any;
    ToDate: any;
}

class DataWorkloadEntry extends ReportStateBaseModel {
    CategoriesData: any;
}
