import { ApiCommonService } from './../../../../service/common/api-common.service';
import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/service/common/helper.service';
import { StorageService } from 'src/app/service/common/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedin;
  categories = [];

  constructor(
    private helper: HelperService,
    private storage: StorageService,
    private apicommon: ApiCommonService
  ) { }

  ngOnInit() {

    this.isLoggedin = this.helper.isAuthorized();
    this.apicommon.get('public/category').subscribe(
      res => {
        this.categories = res;
      }
    );
  }

  logout(): void {

    if (this.helper.isAuthorized()) {
      this.storage.clear();
      this.isLoggedin = false;
    } else {
      this.isLoggedin = false;
    }
  }

}
