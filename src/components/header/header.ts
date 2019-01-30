import { Component, Input } from '@angular/core';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  private _title = "Atlas Digital de Mamografia";
  private _classe = "ml-3 h2 text-white";

  @Input()
  public set title(value: string) {
    if (value) {
    this._title = value;
    }
  }

  @Input()
  public set classe(value: string) {
    if (value) {
    this._classe =  "ml-3 " + value + " text-white";
    }
  }
  
  
  constructor() {
  }

}
