import { Component, Input } from '@angular/core';
import { MenuController } from 'ionic-angular';

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

  constructor(private menuCtrl: MenuController) {
    this.menuCtrl.enable(false);
  }

  enableMenu() {
    console.log("teste")
    this.menuCtrl.enable(true);
    this.menuCtrl.toggle();
  }

  teste(){
    console.log("teste")
    return true;
  }
 
}
