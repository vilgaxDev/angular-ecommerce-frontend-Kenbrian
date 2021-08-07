import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterContentChecked } from '@angular/core';
import { StorageService } from 'src/app/service/common/storage.service';
import { HelperService } from 'src/app/service/common/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit, AfterContentChecked {

  @Output() navBarOpenEvent = new EventEmitter<any>();
  @Output() navPosition = new EventEmitter<any>();
  // search
  searchVisibility = false;
  @ViewChild('autofocus', {static: true}) autofocus: ElementRef; 

  constructor(
    private helper: HelperService,
    private storage: StorageService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  logout(): void {

    if (this.helper.isAuthorized()) {
      this.storage.clear();
      this.router.navigateByUrl('/');
    } else {
      this.router.navigateByUrl('/');
    }
  }

  toggleOpened(): void {

      this.navBarOpenEvent.emit({opened: true});
    }

  toggleNavPosition(): void {

    this.navPosition.emit({ toggleNav: true });
  }

  openSearch(): void {
    this.searchVisibility = true;
  }

  closeSearch(): void {
    this.searchVisibility = false;
  }

  ngAfterContentChecked(): void {
    if (this.searchVisibility === true){
      this.autofocus.nativeElement.focus();
    }
  }

}
