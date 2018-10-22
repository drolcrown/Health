import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertsProvider } from '../../providers/alerts/alerts';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-acount',
  templateUrl: 'acount.html',
})
export class AcountPage {
  private perfis;
  private email;
  private tamanho = {
    width: (window.screen.width * 0.9) + 'px',
    height: (window.screen.height * 0.9) + 'px',
  };
  private img = {
    height: '',
    width: '',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alerta: AlertsProvider,
    public provider: AccessFirebaseProvider,
    public authorization: AngularFireAuth) {
    let tamanhoImg = ((window.screen.height + window.screen.width) / 2);
    this.img.width = (window.screen.width * 0.6) + 'px';
    this.img.height = (tamanhoImg * 0.3) + 'px';
  }

  ionViewDidLoad() {
    this.email = this.authorization.auth.currentUser.email;
    this.perfis = this.provider.getAll('perfil/');
  }

  public trocarSenha(perfil) {
    this.alerta.updatePassword(perfil);
  }

  public excluirConta(perfil) {
    this.alerta.newAlert().create({
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
              this.authorization.auth.currentUser.delete()
                .then(() => {
                  this.provider.remove('perfil/', perfil);
                  this.alerta.showToast('Conta excluída com sucesso!!');
                  this.navCtrl.setRoot(LoginPage);
                }).catch(() => {
                  this.alerta.showToast('Falha na Exclusão de Conta!! Tente Novamente!!');
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
  }
}
