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
  user: string;

  constructor(public provider: AccessFirebaseProvider, public navParam: NavParams) {
    this.conversa = navParam.get('conversa');
    this.user = navParam.get('user');
  }

  ionViewDidEnter(){
  }

  public enviar() {
    let msg = {
      mensagem: this.mensagem,
      data: new Date(),
      user: this.user
    }
    this.conversa.mensagens.push(msg);
    console.log(this.conversa)
    this.provider.update(this.PATH, this.conversa).then((r) => {
      console.log(r)
      this.mensagem = "";
    });
  }

}
