import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { CacheProvider } from '../../../providers/cache/cache';
import { AccessFirebaseProvider } from '../../../providers/access-firebase/access-firebase';
import { HomePage } from '../../home/home';
import { AcountPage } from '../../acount/acount';
import { LoginPage } from '../../login/login';

/**
 * Generated class for the ConfigurationAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configuration-account',
  templateUrl: 'configuration-account.html',
})
export class ConfigurationAccountPage {
  private perfil: any;
  private email: string;
  private PATH = 'perfil';


  constructor(private navCtrl: NavController, private provider: AccessFirebaseProvider,
    private providerCache: CacheProvider, private menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    this.providerCache.get(this.PATH).then(response => {
      this.perfil = response;
    });
  }

  private salvarArquivo(perfil, e) {
    this.provider.alert.newAlert().create({
      title: 'Alterar Imagem',
      message: 'Confirme para alterar a imagem',
      buttons: [
        {
          text: 'Alterar',
          handler: () => {
            this.providerCache.remove(this.PATH);
            let loading = this.provider.loadingCtrl.presentLoadingDefault();
            this.provider.upload(perfil, e)
              .then(response => {
                perfil.imagem = response;
                this.provider.updateParams(this.PATH, 'email', perfil.email, perfil);
                loading.dismiss();
                this.navCtrl.push(AcountPage);
                this.providerCache.save(this.PATH, perfil);
              })
              .catch((erro) => {
                this.provider.alert.showToast('Falha na Alteração da Imagem!!');
                loading.dismiss();
              });
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ]
    }).present();
  }

  public trocarSenha(perfil) {
    this.providerCache.remove(this.PATH);
    perfil = this.provider.updatePassword(perfil);
    this.providerCache.save('perfil', perfil);
  }


  public excluirConta(perfil) {
    this.provider.excluirConta(perfil);
    this.providerCache.clear();
    this.providerCache.save("page", "LoginPage");
    this.navCtrl.popAll();
    this.navCtrl.push(LoginPage);
  }


}
