import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { CacheProvider } from '../../providers/cache/cache';
import { ChatComponent } from '../../components/chat/chat';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  noChats: any = false;
  lista: Array<any> = [];
  user: string;
  PATH: string = 'chat';

  constructor(public navCtrl: NavController,
    public provider: AccessFirebaseProvider, public cache: CacheProvider) {
    // this.teste()
  }

  ionViewDidEnter() {
    this.cache.get('perfil').then(perfil => {
      if (perfil) {
        this.provider.findListObject(this.PATH, perfil.email).subscribe(object => {
          this.user = object.user;
          this.lista = object.list;
          this.noChats = (this.lista.length < 1 ? true : false);
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
    this.navCtrl.push(ChatComponent, { user: this.user, conversa: conv })
  }

  teste() {
    let data = new Date().toLocaleString();
    this.provider.save('chat', {
      user1: { email: "rafaelsoec@gmail.com", imagem: "../../assets/imgs/respect.svg", nome: "Rafael Souza" },
      user2: { email: "rafa17@gmail.com", imagem: "../../assets/imgs/respect.svg", nome: "Rafael Silva" },
      dataInicio: data,
      mensagens: [
        {
          mensagem: "Olá, onde voce atende?",
          data: data,
          user: "user1"
        }
      ]
    });
  }
}
