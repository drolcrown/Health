import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChatComponent } from '../../components/chat/chat';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { CacheProvider } from '../../providers/cache/cache';
import { GaleriaDeFotosComponent } from '../../components/galeria-de-fotos/galeria-de-fotos';

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
    this.anuncio = navParams.get("anuncio");
    this.form = builder.group(this.anuncio);
  }

  ionViewDidEnter() {
    this.cache.get("usuario").then(response => {
      if (response) {
        this.user1 = response;
        let conversas = (response.conversas[0] ? response.conversas : []);
        conversas.filter(el => {
          if (el.idAnuncio == this.anuncio.id) {
            this.conv = el;
            return;
          }
        });
      } else {
        this.provider.getAll('usuario').subscribe((users: Array<any>) => {
          users.filter(user => {
            if (user.email == this.provider.authorization.auth.currentUser.email) {
              this.user1 = user;
              let conversas = (response.conversas[0] ? response.conversas : []);
              conversas.filter(el => {
                if (el.idAnuncio == this.anuncio.id) {
                  this.conv = el;
                  return;
                }
              });
              this.cache.save("usuario", user);
              return;
            }
          });
        });
      }
    });
  }

  goChat() {
    if (!this.conv) {
      let data = new Date().toLocaleString();
      this.conv = {
        cliente: this.user1.id,
        anunciante: this.anuncio.usuario,
        dataInicio: data,
        idAnuncio: this.anuncio.id,
        nomeAnuncio: this.anuncio.nome,
        mensagens: []
      };
    }
    this.navCtrl.push(ChatComponent, { user: this.user1.id, conversa: this.conv })
  }

  openGalery(myImage) {
    this.navCtrl.push(GaleriaDeFotosComponent)
  }
}