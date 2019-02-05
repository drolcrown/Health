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
  name: string;
  text: string;
  profissionais = [];

  @Input()
  private set lista(value) {
    this.profissionais = value;
  }

  constructor(private provider: AccessFirebaseProvider, navParams: NavParams) {
    // this.name = navParams.get('name');
    this.text = 'Hello World';
    // this.profissionais = this.provider.getAll('profissional')
  }

}
