
export class AuditKpiGoalConfigRequestModel {
    constructor(public TableSchema: string,
        public UserGroupID: number,
        public RoleID: number,
        public Flag: any,
        public FromDate: any,
        public ToDate: any,
        public AuditGoalID: number) {

    }
}
