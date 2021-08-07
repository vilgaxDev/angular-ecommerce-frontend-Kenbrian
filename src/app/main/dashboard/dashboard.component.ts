import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  opened;
  position = 'start';
  mode;
  mediaQuery;

  constructor(
   private media: MediaMatcher
  ) { 
    this.mediaQuery = media.matchMedia('(max-width: 900px)');
   }

  ngOnInit() {

    if(this.mediaQuery.matches === true){
      this.opened = false;
      this.mode = 'over';
    }
    else{
      this.opened = true;
      this.mode = 'side';
    }
  }

  navBarOpenEvent(event): void {
    if (event.opened === true) {
      if (this.opened === true) {
        this.opened = false;
      }
      else{
        this.opened = true;
      }
    }
  }

  closeNavBar(event): void {
    if (event.closeSideNav === true && this.mediaQuery.matches === true) {
        this.opened = false;
      }
  }

  navPosition(event): void{
      if ( event.toggleNav === true){
        if ( this.position === 'start') {
          this.position = 'end';
        }
        else{
          this.position = 'start';
        }
      }
  }

  backdropCheck(){
    this.opened = false;
  }

}
