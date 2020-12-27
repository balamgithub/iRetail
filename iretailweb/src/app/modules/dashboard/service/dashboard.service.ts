import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { APIService } from 'src/app/shared/service/api.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import * as firestore from 'firebase/app';

@Injectable()
export class DashboardService {

    $message = new Subject<any[]>();
    $suggestionSet = new Subject<boolean>();
    constructor(private db: AngularFirestore, private _apiService: APIService, private _notificationService: NotificationService) { }

    setSuggestionHistory(data, approved) {
        this.db.collection('SuggestionHistory').doc('approvedhistory')
            .update({ history: firestore.default.firestore.FieldValue.arrayUnion(data) }).then(() => {
                if (approved)
                    this._notificationService.showSuccess('Approved Successfully');
                else
                    this._notificationService.showSuccess('Rejected Successfully');
            });
    }

    getMessages() {
        this._apiService.httpGet('iRetailWeb').subscribe(res => {
            this.$message.next(res);
        });
    }

    getPeopleCount() {
        return this._apiService.httpGet('peoplecount').subscribe(res => {
            this.setSuggestion();
        });
    }

    private setSuggestion() {
        this._apiService.httpGet('suggestion').subscribe(res => {
            this.$suggestionSet.next(true);
        });
    }
}
