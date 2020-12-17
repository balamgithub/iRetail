export class CheckCurrentLoanUserRequestModel {
    constructor(public TableSchema: string, public LoanID: number, public CurrentUserID: number) {

    }
}
