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
    this.provider.alert.presentLoading(2);
    this.initAccount();
  }

  async initAccount() {
    await this.providerCache.get(this.PATH).then(response => {
      this.perfil = response;
    });
  }

  ionViewWillEnter() {
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
                this.navCtrl.push(HomePage);
                this.providerCache.save(this.PATH, perfil);
                this.providerCache.save("page", "HomePage");
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

  public onPage(){
    this.navCtrl.push(ConfigurationPage);
  }
}
