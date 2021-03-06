import { Component, Input } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  private _title = 'Health';
  private _subtitle = 'Saude ao seu alcance!';
  private _activeIcon = true;

  @Input()
  private set title(value) {
    if (value) {
      this._title = value;
      this._activeIcon = false;
    }
  }

  @Input()
  private set subtitle(value) {
    if(!value){
      this._subtitle = '';      
    }
  }

  constructor() {
  }

}
