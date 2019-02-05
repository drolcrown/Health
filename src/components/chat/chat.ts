import { Component } from '@angular/core';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat',
  templateUrl: 'chat.html'
})
export class ChatComponent {
  lista: any;
  mensagem: string;
  conversa: any;
  PATH: string = 'chat';

  constructor(public provider: AccessFirebaseProvider, public navParam: NavParams) {
    this.lista = provider.db.list(this.PATH);
    this.conversa = navParam.get('conversa');
  }

  public enviar() {
    let msg = {
      mensagem: this.mensagem,
      data: new Date()
    }

    this.provider.save(this.PATH, msg).toPromise().then((r) => {
      this.mensagem = "";
    });
  }

}
