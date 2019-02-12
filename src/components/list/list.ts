import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavParams) {
  }

  onScroll(event) {
    this.scrollOn.emit(event);
  }
}
