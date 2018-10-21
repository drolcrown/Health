import { Component, Input } from '@angular/core';
import { AccessFirebaseProvider } from '../../../providers/access-firebase/access-firebase';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { UF } from '../../../models/uf';
import { LoginPage } from '../../../pages/login/login';
import { NavController } from 'ionic-angular';
import { AlertsProvider } from '../../../providers/alerts/alerts';

@Component({
  selector: 'profissional-form',
  templateUrl: 'profissional.html'
})
export class ProfissionalComponent {
  private form: FormGroup;
  private _usuario;
  private _estados = new UF().estados;
  private _msg = '';
  private senhaInvalida = false;
  private formInvalido = false;

  @Input()
  private set usuario(value) {
    this._usuario = value;
  }

  constructor(private builder: FormBuilder, private navCtrl: NavController,
    private alerta: AlertsProvider,
    private db: AccessFirebaseProvider, private authorization: AngularFireAuth) {
      this.form = this.builder.group( {
        avaliacao: [5],
        nome: ['', Validators.required],
        data: ['', Validators.required],
        imagem: [''],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
        profissao: [''],
        cr: [''],
        email: ['', Validators.required],
        senha: ['', Validators.required],
        confirmarSenha: ['', Validators.required],
    });
  }

  private registrar() {
    if (this.form.valid) {
      if (this.form.controls.senha.value === this.form.controls.confirmarSenha.value) {
        this.authorization.auth.createUserWithEmailAndPassword(this.form.controls.email.value, this.form.controls.senha.value);
        this.db.save('perfil/', this.form.value);
        this.alerta.cadastroOkAlert();
        this.goPage();
      } else {
        this.senhaInvalida = true;
      }
    }else{
      this.formInvalido = true;
    }
  }
  
  private goPage() {
    this.navCtrl.setRoot(LoginPage)
  }
}
