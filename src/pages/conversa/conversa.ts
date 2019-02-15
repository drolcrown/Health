import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { CacheProvider } from '../../providers/cache/cache';
import { ChatComponent } from '../../components/chat/chat';

@Component({
  selector: 'page-conversa',
  templateUrl: 'conversa.html'
})
export class ConversaPage {
  noChats: any = false;
  lista: Array<any> = [];
  user: string;
  PATH: string = 'chat';

  constructor(public navCtrl: NavController,
    public provider: AccessFirebaseProvider, public cache: CacheProvider) {
  }

  ionViewDidEnter() {
    this.cache.get('usuario').then(perfil => {
      if (perfil) {
        this.provider.findListChat(this.PATH, perfil.email).subscribe(object => {
          this.user = object.user;
          this.lista = object.list;
          this.noChats = (this.lista.length < 1 ? true : false);
        });
      } else {
        this.provider.getAll('usuario').subscribe((users: Array<any>) => {
          users.filter(user => {
            this.provider.findObject('usuario', 'email', user.email).subscribe(object => {
              this.user = object.user;
              this.lista = object.list;
              this.noChats = (this.lista.length < 1 ? true : false);
            });
          });
        });
      }
    });
  }

  recuperarUltimaConversa(conversa) {
    let msgs = conversa.mensagens;
    if (msgs.length > 0) {
      return msgs[msgs.length - 1].mensagem;
    } else {
      return "";
    }
  }

  public goChat(conv) {
    this.navCtrl.push(ChatComponent, { user: this.user, conversa: conv });
  }
}
