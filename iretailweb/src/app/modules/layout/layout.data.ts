import { Injectable } from '@angular/core';
import { APIService } from '../../shared/service/api.service';

@Injectable()
export class LayoutDataAccess {
    constructor(private _api: APIService) { }

}
