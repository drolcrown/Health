import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CadastroComponent } from '../cadastro/cadastro';

@Component({
  selector: 'forms',
  templateUrl: 'forms.html'
})
export class FormsComponent {

  constructor(private navCtrl: NavController){}

  public registrar() {
    this.navCtrl.push(CadastroComponent);
  }
}
