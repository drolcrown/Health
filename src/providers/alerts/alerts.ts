import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AccessFirebaseProvider } from '../access-firebase/access-firebase';

@Injectable()
export class AlertsProvider {
  public provider: AccessFirebaseProvider;
  private perfil;

  constructor(private authorization: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) { }


  newAlert(){
    return this.alertCtrl;
  }

  presentLoading(valor) {
    let duration = (valor * 1000);
    const loader = this.loadingCtrl.create({
      content: "Carregando...",
      duration: duration,
      dismissOnPageChange: true,
    });
    loader.present();
  }

  cadastroOkAlert() {
    let alert = this.alertCtrl.create({
      title: 'Cadastrado com Sucesso!',
      buttons: ['Ok']
    });
    alert.present();
  }

  cadastroFailAlert() {
    let alert = this.alertCtrl.create({
      title: 'Falha no Cadastro!',
    });
    alert.present();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: 'Do you want to buy this book?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: () => {
            console.log('Buy clicked');
          },
          role: 'cancel',
        }
      ]
    });
    alert.present();
  }

  updatePassword(perfil) {
    this.perfil = perfil;
    let alert = this.alertCtrl.create({
      title: 'Alterar Senha',
      inputs: [
        {
          placeholder: 'Senha Atual',
          type: 'password',
          min: '8',
          name: 'senha',
        },
        {
          placeholder: 'Nova Senha',
          type: 'password',
          min: '8',
          name: 'senha1',
        },
        {
          placeholder: 'Repita a Nova Senha',
          type: 'password',
          min: '8',
          name: 'senha2',
        },
      ],
      buttons: [
        {
          text: 'Trocar',
          cssClass: 'btn btn-primary',
          handler: (data) => {
            if (data.senha1 && data.senha2 && data.senha) {
              this.verificarTrocaSenha(data);
            } else {
              this.showToast("Preencha todos os campos!!");
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
    });
    alert.present();
    return alert;
  }

  verificarTrocaSenha(alert) {
    if (this.perfil.senha == alert.senha) {
      if (alert.senha1 == alert.senha2) {
        this.authorization.auth.currentUser.updatePassword(alert.senha1)
          .then(() => {
            this.provider.save('perfil/', this.perfil);
            this.showToast('Senha Alterada Com Sucesso!!');
          }).catch(() => {
            this.showToast('Falha na Alteração de Senha!! Tente Novamente!!');
          });
      } else {
        this.showToast("Senhas Diferentes!!");
      }
    }else {
      this.showToast("Senhas Atual Incorreta!!");
    }
  }

  showToast(data: any) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'bottom',
      cssClass: 'text-center',
      showCloseButton: true
    });
    toast.onDidDismiss(() => {
    });
    toast.present();
  }
}