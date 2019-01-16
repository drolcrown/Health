import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { LoginPage } from '../login/login';
import { CacheProvider } from '../../providers/cache/cache';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-acount',
  templateUrl: 'acount.html',
})
export class AcountPage {
  private perfil: any;
  private email: string;
  private PATH = 'perfil';
  private tamanho = {
    width: (window.screen.width * 0.9) + 'px',
    height: (window.screen.height * 0.82) + 'px',
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
    private provider: AccessFirebaseProvider, private providerCache: CacheProvider) {
    let tamanhoImg = ((window.screen.height + window.screen.width) / 2);
    this.img.width = (window.screen.width * 0.6) + 'px';
    this.img.height = (tamanhoImg * 0.3) + 'px';
    this.providerCache.get(this.PATH).then(response =>{
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
            this.provider.upload(perfil, e).subscribe( response => {
              loading.dismiss();
              this.providerCache.save(this.PATH, perfil);
              this.navCtrl.setRoot(HomePage)
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
    this.provider.alert.updatePassword(perfil);
    this.providerCache.save(this.PATH, perfil);
  }


  public excluirConta(perfil) {
    this.provider.alert.newAlert().create({
      title: 'Excluir Conta',
      inputs: [
        {
          placeholder: 'Digite a senha',
          type: 'password',
          min: '8',
          name: 'senha',
        },
      ],
      buttons: [
        {
          text: 'Excluir',
          cssClass: 'btn btn-primary',
          handler: (data) => {
            if (data.senha == perfil.senha) {
              this.provider.authorization.auth.currentUser.delete()
                .then(() => {
                  this.provider.remove('perfil/', perfil);
                  this.provider.alert.showToast('Conta excluída com sucesso!!');
                  this.navCtrl.setRoot(LoginPage);
                }).catch(() => {
                  this.provider.alert.showToast('Falha na Exclusão de Conta!! Tente Novamente!!');
                });
            }
          }
        },
        {
          text: 'Cancelar',
          cssClass: 'btn btn-primary',
          role: 'cancel',
          handler: () => {
          },
        },
      ],
    }).present();
    this.providerCache.remove(this.PATH);
  }
}
