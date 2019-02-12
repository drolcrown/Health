import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CacheProvider } from '../../providers/cache/cache';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  private form: FormGroup;
  private buttonBack = "Sair";
  private _conversa: {
    mensagem: string,
    inputs: Array<any>
  };

  @Input()
  private set conversa(value) {
    console.log(value)
    this._conversa = value;
  }

  constructor(public navParams: NavParams, public navCtrl: NavController,
    public builder: FormBuilder, public cache: CacheProvider) {
    // this._conversa = this.navParams.get("conversa");
    // this.buttonBack = this.navParams.get("button");
    this.form = builder.group({
      cpf: "",
      email: "",
      nome: "",
      sobrenome: "",
      data: "",
      estado: "",
      municipio: "",
      senha: ""
    });
    this._conversa.inputs.forEach(el => {
      this.gerarControl(el.nome);
    })
  }

  public gerarControl(nome) {
    let control = new FormControl('', Validators.required);
    this.form.setControl(nome, control);
  }


  logIn() {
    if (this.form.valid) {
      this.navCtrl.push(ModalPage, { perfil: this.form.value })
      // this.viewCtrl.dismiss(this.form.value);
    }
  }

}
