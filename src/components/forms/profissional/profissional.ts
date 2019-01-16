import { Component, Input } from '@angular/core';
import { AccessFirebaseProvider } from '../../../providers/access-firebase/access-firebase';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { UF } from '../../../models/uf';
import { LoginPage } from '../../../pages/login/login';
import { NavController } from 'ionic-angular';
import { AlertsProvider } from '../../../providers/alerts/alerts';
import { DatePipe } from '@angular/common';

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

  @Input()
  private set usuario(value) {
    this._usuario = value;
  }

  constructor(private builder: FormBuilder, private navCtrl: NavController,
    private alerta: AlertsProvider, private datePipe: DatePipe,
    private provider: AccessFirebaseProvider, private authorization: AngularFireAuth) {
    this.form = this.builder.group({
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
    });
  }

  private registrar() {
    if (this.form.valid) {
      if (this.form.controls.senha.value === this.form.controls.confirmarSenha.value) {
        this.authorization.auth.createUserWithEmailAndPassword(this.form.controls.email.value,
          this.form.controls.senha.value)
          .then(resposta => {
            let objeto = this.form.value;
            // objeto.senha = sha256(this.form.controls.senha.value);
            objeto.confirmarSenha = objeto.senha;
            objeto.data = this.datePipe.transform(this.form.controls.data.value, 'dd/MM/yyyy');
            this.provider.save('perfil/', objeto);
            this.goPage();
          }).catch(error => {
            this.provider.alert.showToast('Email em uso.')
          });
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
