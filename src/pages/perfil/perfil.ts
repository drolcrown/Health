import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChatComponent } from '../../components/chat/chat';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { CacheProvider } from '../../providers/cache/cache';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  private anuncio: any;
  private user1: any;
  private conv: any = null;
  private user: string = "user1";
  private form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private builder: FormBuilder, public cache: CacheProvider, public provider: AccessFirebaseProvider) {
    this.anuncio = navParams.get("perfil");
    this.form = builder.group(this.anuncio);
  }

  ionViewDidEnter() {
    this.cache.get("usuario").then(response => {
      if (response) {
        this.user1 = response;
        this.provider.findObject('chat', 'idAnuncio', this.anuncio.id)
          .subscribe((resp) => {
            this.user = (resp.user1.email === this.user1.email ? 'user1' : 'user2');
            this.conv = resp;
          });
      }
    });
  }

  goChat() {
    if (!this.conv) {
      let data = new Date().toLocaleString();
      this.conv = {
        user1: { email: this.user1.email, imagem: this.user1.imagem, nome: this.user1.nome },
        user2: { email: this.anuncio.email, imagem: this.anuncio.imagem, nome: this.anuncio.nome },
        dataInicio: data,
        idAnuncio: this.anuncio.id,
        nomeAnuncio: this.anuncio.nome,
        mensagens: []
      };
    }
    this.navCtrl.push(ChatComponent, { user: this.user, conversa: this.conv })

  }
}
