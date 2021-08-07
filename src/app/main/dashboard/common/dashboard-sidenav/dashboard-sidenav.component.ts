import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Dashboard } from '../../../navigation/dashboard';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-sidenav',
  templateUrl: './dashboard-sidenav.component.html',
  styleUrls: ['./dashboard-sidenav.component.scss']
})
export class DashboardSidenavComponent implements OnInit {

  dashboard;
  mediaQuery;

  @Output() closeNavBar = new EventEmitter<any>();

  constructor(
   private media: MediaMatcher,
   private router: Router
  ) { 
    this.mediaQuery = media.matchMedia('(max-width: 900px)');
    this.dashboard = Dashboard;
  }

  ngOnInit() {}

  handleSideNav(url): void {

    if (this.mediaQuery) {
      this.closeNavBar.emit({closeSideNav: true});
    }
    url ? this.router.navigateByUrl(url) : this.router.navigateByUrl('/dashboard');
  }

  get self() { return this; }

  logout(): void {
    console.log('logout()');
  }

}
