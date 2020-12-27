import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.css']
})
export class DashboardComponent {

  sub: Subscription[] = [];
  
  promise: Subscription;
  user: SocialUser;
  queueMessages: any[] = [];// ["Hi Prakash Web", "Hi Prakash Web 2", "Hi Prakash Web 3", "Hi Prakash Web 4", "Hi Prakash Web 5", "Hi Prakash Web 6"];
  constructor(private _route: Router, private _notificationService: NotificationService, private _dashBoardService: DashboardService,) { }
  public daterange: any = {};
  options: any = {
    locale: { format: 'MM/DD/YYYY' },
    alwaysShowCalendars: false,
  };

  selectedDate(value: any, datepicker?: any) {
    datepicker.start = value.start;
    datepicker.end = value.end;
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
    this._dashBoardService.getMessages();
  }


  ngOnInit(): void {
    const loggedIn = (localStorage.getItem('userdetails') !== undefined && localStorage.getItem('userdetails') !== null);
    if (!loggedIn)
      this._route.navigate(['']);
    else {
      this.user = JSON.parse(localStorage.getItem('userdetails'));
    }

    this.sub.push(this._dashBoardService.$message.subscribe((res: any[]) => {
      if (res.length > 0)
        this.queueMessages = res;
      else
        this._notificationService.showWarning("No Suggestions Available");
    }));

    this.sub.push(this._dashBoardService.$suggestionSet.subscribe(res => {
      if (res)
        this._dashBoardService.getMessages();
    }));

    this.promise = this._dashBoardService.getPeopleCount();
  }

  ngOnDestory() {
    this.sub.forEach(element => {
      element.unsubscribe();
    });
  }

  messageAction(_message, _approved) {

    const data = { Message: _message, Approved: _approved, ApprovedOn: new Date().getTime().toString(), ApprovedBy: this.user.name };
    this._dashBoardService.setSuggestionHistory(data, _approved);
    this.queueMessages.forEach((element, index) => {
      if (element == _message) this.queueMessages.splice(index, 1);
    });
    this.queueMessages = [...this.queueMessages];
  }
}
