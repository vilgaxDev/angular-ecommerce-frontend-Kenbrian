import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private storage: StorageService,
  ) { }

  public isAuthorized(): boolean {
    const token = this.storage.getAccessToken();
    return !!token;
  }

  public getAuthHeader() {
    const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.storage.getAccessToken());

    return headers;
  }

}
