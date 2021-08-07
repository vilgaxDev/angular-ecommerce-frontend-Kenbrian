import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  deviceInfo;

  constructor() { }

  async ngOnInit() {

    const { Device  } = Plugins;

    this.deviceInfo = await Device.getInfo();

  }
  

}
