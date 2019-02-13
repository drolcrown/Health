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
  private perfil;
  private user1;
  private form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private builder: FormBuilder, public cache: CacheProvider, public provider: AccessFirebaseProvider) {
    this.perfil = navParams.get("perfil");
    this.form = builder.group(this.perfil);
  }

  ionViewDidEnter() {
    this.cache.get("usuario").then(response => {
      if (response) {
        this.user1 = response;
      }
    });
  }

  public goChat() {
    let data = new Date().toLocaleString();
    let conv = {
      user1: { email: this.user1.email, imagem: this.user1.imagem, nome: this.user1.nome },
      user2: { email: this.perfil.email, imagem: this.perfil.imagem, nome: this.perfil.nome },
      dataInicio: data,
      mensagens: []
    };
    this.navCtrl.push(ChatComponent, { user: 'user1', conversa: conv });
  }
}
