import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CacheProvider } from '../../providers/cache/cache';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { ModalPage } from '../modal/modal';

/**
 * Generated class for the MeusAnunciosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meus-anuncios',
  templateUrl: 'meus-anuncios.html',
})
export class MeusAnunciosPage {
  private objectList = [];
  private PATH = "usuario";
  private user;

  constructor(public navCtrl: NavController, public provider: AccessFirebaseProvider,
    public providerCache: CacheProvider) {
  }

  ionViewDidLoad() {
    this.providerCache.recoverUser().subscribe((perfil) => {
      if (perfil) {
        this.user = perfil;
        this.provider.getAll("anuncio").subscribe((list: Array<any>) => {
          list.filter(anuncio => {
            if (anuncio.usuario == perfil.usuario) {
              this.objectList.push(anuncio);
            }
          });
        });
      }
    });
  }

  public openModal() {
    this.navCtrl.push(ModalPage, { usuario: this.user, page: MeusAnunciosPage });
  }

}
