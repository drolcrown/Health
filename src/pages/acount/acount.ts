import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { LoginPage } from '../login/login';
import { CacheProvider } from '../../providers/cache/cache';
import { HomePage } from '../home/home';
import { ConfigurationPage } from '../configuration/configuration';

@IonicPage()
@Component({
  selector: 'page-acount',
  templateUrl: 'acount.html',
})
export class AcountPage {
  private perfil: any;
  private email: string;
  private PATH = 'perfil';

  constructor(private navCtrl: NavController, private provider: AccessFirebaseProvider, 
    private providerCache: CacheProvider, private menuCtrl: MenuController) {
    this.provider.alert.presentLoading(3);
    this.initAccount();
  }

  async initAccount() {
    await this.providerCache.get(this.PATH).then(response => {
      this.perfil = response;
    });
  }

  ionViewWillEnter() {
  }

  public onPage(){
    this.navCtrl.push(ConfigurationPage);
  }
}
