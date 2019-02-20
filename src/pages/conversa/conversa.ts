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

  async ionViewDidEnter() {
    await this.cache.recoverUser().subscribe((perfil) => {
      if (perfil) {
        this.user = perfil;
        this.provider.getAll(this.PATH).subscribe((list: Array<any>) => {
          list.filter(conversa => {
            if (conversa.anunciante && conversa.cliente) {
              if (conversa.cliente.email.indexOf(perfil.email) > -1 || conversa.user1.email.indexOf(perfil.email) > -1) {
                this.lista.push(conversa);
              }
            }
          });
        });
      }
    });
    this.noChats = (this.lista.length < 1 ? true : false);
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
