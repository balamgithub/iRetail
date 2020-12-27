import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Subject, Subscription } from "rxjs";
import { convertDate } from "src/app/shared/custom.function";

@Injectable()
export class SuggestionHistoryService {

    subs: Subscription;
    $suggestionHistory = new Subject<any[]>();

    constructor(private db: AngularFirestore) { }

    getApprovedSuggestionHistory(fromDate, toDate) {
        if (this.subs)
            this.subs.unsubscribe();

        const fromDateTime = convertDate(fromDate, 0);
        const toDateTime = convertDate(toDate, 1);
        const collection = this.db.collection('SuggestionHistory').doc('approvedhistory').get();
        this.subs = collection.subscribe((snapshot) => {
            const docData = snapshot.data();
            let tableData = [];
            docData['history'].forEach(element => {
                const approvedOnDateTime = convertDate(element.ApprovedOn, 0);
                if (approvedOnDateTime >= fromDateTime && approvedOnDateTime < toDateTime && element.Approved === true)
                    tableData.push(element);
            });
            this.$suggestionHistory.next(tableData);
        });
    }

}
