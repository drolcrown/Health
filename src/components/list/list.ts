import { Component, Input } from '@angular/core';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { SituacaoClinica } from '../../Models/situacaoClinica';
import { NavParams } from 'ionic-angular';

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

  constructor(private provider: AccessFirebaseProvider, navParams: NavParams) {
  }

}
