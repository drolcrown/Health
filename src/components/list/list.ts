import { Component, Input } from '@angular/core';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { SituacaoClinica } from '../../Models/situacaoClinica';
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
  perfis = PerfilPage;

  @Input()
  private set lista(value) {
    this.options = value;
  }

  contacts;
  groupedContacts = [];

  constructor(public navCtrl: NavController) {

      this.contacts = [
          'Kate Beckett',
          'Richard Castle',
          'Alexis Castle',
          'Lanie Parish',
          'Javier Esposito',
          'Kevin Ryan',
          'Martha Rodgers',
          'Roy Montgomery',
          'Jim Beckett',
          'Stana Katic',
          'Nathan Fillion',
          'Molly Quinn',
          'Tamala Jones',
          'Jon Huertas',
          'Seamus Dever',
          'Susan Sullivan'
      ];

      this.groupContacts(this.contacts);

  }

  groupContacts(contacts){

      let sortedContacts = contacts.sort();
      let currentLetter = false;
      let currentContacts = [];

      sortedContacts.forEach((value, index) => {
        console.log(value)
          // if(value.charAt(0) != currentLetter){

          //     currentLetter = value.charAt(0);

          //     let newGroup = {
          //         letter: currentLetter,
          //         contacts: []
          //     };

          //     currentContacts = newGroup.contacts;
          //     this.groupedContacts.push(newGroup);

          // } 

          // currentContacts.push(value);

      });

  }
}
