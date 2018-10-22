import { Component, Input } from '@angular/core';
import { AccessFirebaseProvider } from '../../../providers/access-firebase/access-firebase';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
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
  private arquivo;
  private _estados = new UF().estados;
  private _msg = '';
  private senhaInvalida = false;
  private formInvalido = false;
  private objetoAux;
  private objeto = {
    avaliacao: [5],
    nome: ['', Validators.required],
    data: ['', Validators.required],
    peso: [''],
    imagem: [''],
    cidade: ['', Validators.required],
    estado: ['', Validators.required],
    profissao: [''],
    cr: [''],
    email: ['', Validators.required],
    senha: ['', Validators.required],
    confirmarSenha: ['', Validators.required],
  };

  @Input()
  private set usuario(value) {
    this._usuario = value;
  }

  constructor(private builder: FormBuilder, private navCtrl: NavController,
    private alerta: AlertsProvider,
    private provider: AccessFirebaseProvider, private authorization: AngularFireAuth) {
    this.form = this.builder.group(this.objeto);
  }

  private salvarArquivo(e) {
    this.arquivo = e;
  }

  private registrar() {
    if (this.form.valid) {
      if (this.form.controls.senha.value === this.form.controls.confirmarSenha.value) {
        this.authorization.auth.createUserWithEmailAndPassword(this.form.controls.email.value, this.form.controls.senha.value);
        this.provider.upload(this.form.value, this.arquivo).then(resp => {
          this.objetoAux = this.form.value;
          this.objetoAux.imagem = resp
        }).catch(e => console.error(e));
        this.alerta.cadastroOkAlert();
        this.provider.save('perfil/', this.form.value);
        this.goPage();
      } else {
        this.senhaInvalida = true;
      }
    } else {
      this.formInvalido = true;
    }
  }

  private goPage() {
    this.navCtrl.setRoot(LoginPage)
  }
}
