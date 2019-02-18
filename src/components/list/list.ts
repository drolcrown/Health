import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { PerfilPage } from '../../pages/perfil/perfil';

/**
 * Generated class for the ListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'list',
  templateUrl: 'list.html'
})
export class ListComponent {
  options = [];

  @Input()
  private set lista(value) {
    this.options = value;
  }

  @Output() scrollOn = new EventEmitter<any>();

  constructor(public navCtrl: NavController) {
  }

  public onScroll(event) {
    this.scrollOn.emit(event);
  }

  public setDate(data){
    return new Date();
  }

  public goPerfil(perf) {
    this.navCtrl.push(PerfilPage, { anuncio: perf })
  }
}
