import { Injectable } from '@angular/core';
import { APIService } from 'src/app/shared/service/api.service';

@Injectable()
export class DashboardDataAccess {
    constructor(private _api: APIService) {
    }

}
