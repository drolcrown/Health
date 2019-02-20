import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  private user: any;
  private anunciante: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public cache: CacheProvider, public provider: AccessFirebaseProvider) {
  }

  async ionViewDidEnter() {
    await this.cache.recoverUser().subscribe(response => {
      if (response) {
        this.user1 = response;
        this.anuncio = this.navParams.get("anuncio");
        this.provider.get("usuario", this.anuncio.usuario).subscribe(anunc =>{
          this.anunciante = anunc;
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
        imagem: this.anuncio.imagem,
        mensagens: []
      };
    }
    this.navCtrl.push(ChatComponent, { user: this.user1, conversa: this.conv })
  }

  openGalery(myImage) {
    this.navCtrl.push(GaleriaDeFotosComponent)
  }
}
