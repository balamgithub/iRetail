import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.css']
})
export class HistoryComponent {

  constructor(private router: Router) { }

  ngOnInit() {
   
  }

}
