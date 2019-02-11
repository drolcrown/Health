import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ModalPessoaisPage } from '../../pages/modal-pessoais/modal-pessoais';
import { CacheProvider } from '../../providers/cache/cache';
import { ModalProfissionaisPage } from '../../pages/modal-profissionais/modal-profissionais';

@Component({
  selector: 'forms',
  templateUrl: 'forms.html'
})
export class FormsComponent {
  constructor(private navCtrl: NavController){
   }

  public registrar(nome) {
    this.navCtrl.push(ModalPessoaisPage , { usuario: nome });
  }
}
