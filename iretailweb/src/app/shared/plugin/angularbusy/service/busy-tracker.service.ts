import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {Subscription, from, timer} from 'rxjs';
import {isPromise} from '../util/isPromise';

export interface TrackerOptions {
  minDuration: number;
  delay: number;
  busyList: (Promise<any> | Subscription)[];
}

@Injectable({
  providedIn: 'root'
})
export class BusyTrackerService implements OnDestroy {

  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(val: boolean) {
    if (!this._isActive && val && this.onStartBusy) {
      this.onStartBusy.emit();
    }
    if (this._isActive && !val && this.onStopBusy) {
      this.isBusiesProcessing = false;
      this.onStopBusy.emit();
    }
    this._isActive = val;
  }
  get busyList() {
    return this.busyQueue;
  }

  onStartBusy: EventEmitter<any> = new EventEmitter();
  onStopBusy: EventEmitter<any> = new EventEmitter();

  private isDelayProcessing = false;
  private isDurationProcessing = false;
  private isBusiesProcessing = false;
  private busyQueue: Subscription[] = [];
  private _isActive = false;

  load(options: TrackerOptions) {
    this.loadBusyQueue(options.busyList);
    this.startLoading(options);
  }

  ngOnDestroy(): void {
  }

  private updateActiveStatus() {
    this.isActive = this.isBusiesProcessing &&
      !this.isDelayProcessing &&
      (this.isDurationProcessing || this.busyQueue.length > 0);
  }

  private startLoading(options: TrackerOptions) {
    if (!this.isBusiesProcessing && this.busyList.length > 0) {
      this.isBusiesProcessing = true;
      this.isDelayProcessing = true;
      this.updateActiveStatus();
      timer(options.delay).subscribe(() => {
        this.isDelayProcessing = false;
        this.isDurationProcessing = true;
        this.updateActiveStatus();
        timer(options.minDuration).subscribe(() => {
          this.isDurationProcessing = false;
          this.updateActiveStatus();
        });
      });
    }
  }

  private loadBusyQueue(busies: (Promise<any> | Subscription)[]) {
    busies.filter((busy) => {
      return busy && !busy.hasOwnProperty('__loaded_mark_by_ng_busy');
    }).forEach((busy: Promise<any> | Subscription) => {
      Object.defineProperty(busy, '__loaded_mark_by_ng_busy', {
        value: true, configurable: false, enumerable: false, writable: false
      });
      let curBusy;
      if (isPromise(busy)) {
        curBusy = from(busy).subscribe();
      } else {
        curBusy = busy;
      }
      this.appendToQueue(curBusy);
    });
  }

  private appendToQueue(busy: Subscription) {
    this.busyQueue.push(busy);
    busy.add(() => {
      this.busyQueue = this.busyQueue.filter((cur: Subscription) => !cur.closed);
      this.updateActiveStatus();
    });
  }
}
