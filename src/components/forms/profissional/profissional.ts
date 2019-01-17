import { Component, Input } from '@angular/core';
import { AccessFirebaseProvider } from '../../../providers/access-firebase/access-firebase';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { UFs } from '../../../models/uf';
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
  private _estados = UFs;
  private _msg = '';
  private senhaInvalida = false;
  private emailInvalido = false;
  private formInvalido = "";

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
      peso: ['', (this._usuario == 'paciente' ? Validators.required : null)],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      imagem: [''],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      profissao: ['', (this._usuario == 'profissional' ? Validators.required : null)],
      cr: ['', (this._usuario == 'profissional' ? Validators.required : null)],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      confirmarSenha: ['', Validators.required],
    });

  }

  private registrar() {
    if (this.form.valid) {
      let objeto = this.form.value;
      objeto.senha = this.provider.encripty(this.form.controls.senha.value);
      objeto.confirmarSenha = this.provider.encripty(this.form.controls.confirmarSenha.value);
      if (objeto.confirmarSenha === objeto.senha) {
        this.authorization.auth.createUserWithEmailAndPassword(objeto.email, objeto.senha)
          .then(resposta => {
            objeto.data = this.datePipe.transform(this.form.controls.data.value, 'dd/MM/yyyy');
            this.provider.save('perfil/', objeto).subscribe(resp => {
              this.goPage();
            }), (error => {
              this.alerta.showToast('Falha no Cadastro!! Tente Novamente')
            });
          }).catch(error => {
            this.formInvalido = "Email em Uso!!";
          });
      } else {
        this.formInvalido = "Senha Diferentes!!";
      }
    } else {
      this.formInvalido = "Preencha Todos os Campos!!";
    }
  }

  private goPage() {
    this.navCtrl.push(LoginPage)
  }
}
