import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  secondes: number;
  counterSubscription: Subscription;
  constructor() {}
  ngOnInit() {
    var counter = Observable.interval(1000);
    this.counterSubscription = counter.subscribe((value: number) => {
      this.secondes = value;
    });
  }
  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }
}
