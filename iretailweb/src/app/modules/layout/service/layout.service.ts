import { Injectable } from '@angular/core';
import { LayoutDataAccess } from '../layout.data';

@Injectable()
export class LayoutService {

  constructor(private _layoutData: LayoutDataAccess) { }

}
