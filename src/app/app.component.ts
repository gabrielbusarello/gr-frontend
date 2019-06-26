import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationCancel } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit, OnDestroy {

  private subRouter: Subscription;
  private loadingModules: boolean;

  constructor( private router: Router ) { }

  ngAfterViewInit() {
    this.subRouter = this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.loadingModules = true;
      } else if (event instanceof RouteConfigLoadEnd || event instanceof NavigationCancel) {
        this.loadingModules = false;
      }
    });
  }

  ngOnDestroy() {
    this.subRouter.unsubscribe();
  }
}
