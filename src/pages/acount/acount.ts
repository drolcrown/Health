import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { LoginPage } from '../login/login';
import { CacheProvider } from '../../providers/cache/cache';
import { HomePage } from '../home/home';
import { ConfigPage } from '../config/config';

@IonicPage()
@Component({
  selector: 'page-acount',
  templateUrl: 'acount.html',
})
export class AcountPage {
  private form: FormGroup;
  private perfil: any;
  private email: string;
  private PATH = 'perfil';
  private tamanho = {
    width: (window.screen.width * 0.95) + 'px',
    height: (window.screen.height * 0.85) + 'px',
  };

  private box = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  }

  private img = {
    height: '',
    width: '',
  };

  constructor(private navCtrl: NavController, private navParams: NavParams,
    private menuCtrl: MenuController, private builder: FormBuilder,
    private provider: AccessFirebaseProvider, private providerCache: CacheProvider) {
    let tamanhoImg = ((window.screen.height + window.screen.width) / 2);
    this.img.width = (window.screen.width * 0.6) + 'px';
    this.img.height = (tamanhoImg * 0.3) + 'px';
  }

  ionViewDidEnter() {
    let alerta = this.provider.loadingCtrl.presentLoadingDefault();
    this.providerCache.get(this.PATH).then(response => {
      this.form = this.builder.group(response)
      this.perfil = response;
      alerta.dismiss();
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
                this.providerCache.save(this.PATH, perfil);
                loading.dismiss();
                this.navCtrl.setRoot(AcountPage);
              })
              .catch((erro) => {
                this.provider.alert.showToast('Falha na Alteração da Imagem!!');
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
    this.perfil = this.provider.updatePassword(perfil);
    this.providerCache.remove(this.PATH);
    this.providerCache.save('perfil', perfil);
  }


  public excluirConta(perfil) {
    if (this.provider.excluirConta(perfil)) {
      this.providerCache.clear();
      this.navCtrl.push(LoginPage);
    }
  }

  public goConfig() {
    this.navCtrl.push(ConfigPage);
  }

  public toggle() {
    this.menuCtrl.toggle();
  }
}
