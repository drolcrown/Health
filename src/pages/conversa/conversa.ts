import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { CacheProvider } from '../../providers/cache/cache';
import { ChatComponent } from '../../components/chat/chat';
import { t } from '@angular/core/src/render3';

@Component({
  selector: 'page-conversa',
  templateUrl: 'conversa.html'
})
export class ConversaPage {
  lista: Array<any> = [];
  user: any;
  listMsg: Array<any> = [];
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
              if (conversa.cliente.indexOf(perfil.id) > -1 || conversa.anunciante.indexOf(perfil.id) > -1) {
                this.lista.push(conversa);
                this.recuperaConversas(this.user, conversa);
              }
            }
          });
        });
      }
    });
  }

  async recuperaConversas(perfil, conversa) {
    if (conversa.mensagens.length > 0) {
      let msgs = conversa.mensagens;
      let lastMsg = msgs[msgs.length - 1];
      if (lastMsg.user.id == perfil.id) {
        this.listMsg.push(lastMsg);
      } else {
        this.provider.get("usuario", lastMsg.user.id).subscribe(usuario => {
          if (usuario) {
            lastMsg.user = usuario;
            this.listMsg.push(lastMsg);
          }
        });
      }
    } else {
      this.listMsg.push({
        data: "",
        mensagem: "",
        user: ""
      });
    }
  }

  public goChat(conv) {
    this.lista = [];
    this.listMsg = [];
    this.navCtrl.push(ChatComponent, { user: this.user, conversa: conv });
  }
}
