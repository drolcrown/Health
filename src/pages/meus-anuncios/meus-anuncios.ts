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
    let alerta = this.provider.loadingCtrl.presentLoadingDefault();
    this.providerCache.get('usuario').then(perfil => {
      if (perfil) {
        this.user = perfil;
        this.objectList = (perfil.anuncios[0] ? perfil.anuncios : []);
        alerta.dismiss();
      } else {
        this.provider.getAll('usuario').subscribe((users: Array<any>) => {
          users.filter(user => {
            if (user.email == this.provider.authorization.auth.currentUser.email) {
              this.user = user;
              this.providerCache.save(this.PATH, user);
              this.objectList = (user.anuncios[0] ? user.anuncios : []);
              alerta.dismiss();
              return;
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
