import { Component, Input } from '@angular/core';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  private _title = 'Health';
  private _hideButton = true;

  @Input()
  private set title(value) {
    if (value) {
      this._title = value;
    }
  }

  @Input()
  private set hideButton(value) {
    this._hideButton = value;
  }

  constructor(public menuCtrl: MenuController) {
    menuCtrl.enable(true);
  }

  public enableMenu() {
    this.menuCtrl.enable(true);
    this.menuCtrl.toggle();
  }

}
