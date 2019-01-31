import { Component, Input } from '@angular/core';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  private _title = 'Health';
  private _subtitle = 'Saude ao seu alcance!';
  private _hideButton = true;

  @Input()
  private set title(value) {
    if (value) {
      this._title = value;
    }
  }

  @Input()
  private set hideButton(value) {
    if (value != "" && value) {
      this._hideButton = value;
    } else {
      this._hideButton = false;
    }
  }

  @Input()
  private set subtitle(value) {
    if (!value) {
      this._subtitle = '';
    }
  }

  constructor(private menuCtrl: MenuController) {
  }

  enableMenu() {
    this.menuCtrl.enable(true);
  }

}
