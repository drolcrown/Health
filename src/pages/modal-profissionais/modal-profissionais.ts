import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ModalPessoaisPage } from '../modal-pessoais/modal-pessoais';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { LoginPage } from '../login/login';
import { ModalPage } from '../modal/modal';

@IonicPage()
@Component({
  selector: 'page-modal-profissionais',
  templateUrl: 'modal-profissionais.html',
})
export class ModalProfissionaisPage {
  private formInvalido = "";
  private perfil;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private provider: AccessFirebaseProvider, private modalCtrl: ModalController) {
    this.perfil = navParams.get('perfil');
  }

  openModal(nome){
    let profileModal = this.modalCtrl.create(ModalPage, {nome: nome});
    profileModal.present();

    profileModal.onDidDismiss(data => {  
      console.log(data);
    });
  }

  private registrar() {
    // if (this.form.valid) {
    //   this.perfil.profissao = this.form.controls.profissao.value;
    //   this.perfil.especialidades = this.form.controls.especialidades.value;
    //   this.perfil.cr = this.form.controls.cr.value;
    //   this.provider.save('perfil/', this.perfil).subscribe(resp => {
    //     this.provider.alert.showToast('Cadastro Realizado com Sucesso!!');
    //     this.navCtrl.push(LoginPage);
    //   })
    // } else {
    //   this.formInvalido = "Adicione uma profissão";
    // }
  }

  private goPage() {
    this.navCtrl.push(ModalPessoaisPage);
  }
}
