import { Component } from '@angular/core';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { NavParams } from 'ionic-angular';
import { CacheProvider } from '../../providers/cache/cache';

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
  user: any;

  constructor(public provider: AccessFirebaseProvider, public navParam: NavParams, public cache: CacheProvider) {
    this.conversa = navParam.get('conversa');
    this.user = navParam.get('user'); 
  }

  ionViewDidEnter() {
  }

  async enviar() {
    let msg = {
      mensagem: this.mensagem,
      data: new Date(),
      user: this.user
    }
    if (this.mensagem != "") {
      this.conversa.mensagens.push(msg);
      if (this.conversa.id) {
        this.provider.update(this.PATH, this.conversa).then((conv) => { });
      } else {
        this.provider.save(this.PATH, this.conversa).subscribe((conv) => {
          this.conversa = conv;
        });
      }
      this.mensagem = "";
    }
  }

}
