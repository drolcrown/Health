import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CacheProvider } from '../../providers/cache/cache';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';

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
    this.providerCache.get(this.PATH).then(response => {
      if (response) {
        this.user = response;
        this.objectList = response.anuncios;
        alerta.dismiss();
      } else {
        this.provider.getAll(this.PATH).subscribe((users: Array<any>) => {
          users.filter(user => {
            this.provider.findObject(this.PATH, 'email', user.email).subscribe(resp => {
              this.user = resp;
              this.providerCache.save(this.PATH, resp);
              this.objectList = response.anuncios;
              alerta.dismiss();
            });
          });
        });
      }
    });
  }

}
