import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { LoginPage } from '../login/login';
import { CacheProvider } from '../../providers/cache/cache';
import { HomePage } from '../home/home';
import { ConfigPage } from '../config/config';
import { UFs } from '../../models/uf';
import { ImageViewerController } from 'ionic-img-viewer';

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
  private _estados = UFs;
  private _imageViewerCtrl;

  constructor(private navCtrl: NavController, private navParams: NavParams,
    private menuCtrl: MenuController, private builder: FormBuilder,
    private provider: AccessFirebaseProvider, private providerCache: CacheProvider,
    imageViewerCtrl: ImageViewerController) {
    this._imageViewerCtrl = imageViewerCtrl;
  }

  ionViewDidEnter() {
    let alerta = this.provider.loadingCtrl.presentLoadingDefault();
    this.providerCache.get(this.PATH).then(response => {
      this.form = this.builder.group(response);
      this.perfil = response;
      alerta.dismiss();
    });
  }

  presentImage(myImage) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
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
                this.form = this.builder.group(perfil);
                this.provider.update(this.PATH, perfil);
                this.providerCache.save(this.PATH, perfil);
                this.providerCache.save("load-perfil", false);
                loading.dismiss();
              })
              .catch((erro) => {
                loading.dismiss();
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
      this.navCtrl.setRoot(LoginPage);
    }
  }

  public goConfig() {
    this.navCtrl.push(ConfigPage);
  }

  public toggle() {
    this.menuCtrl.toggle();
  }
}
