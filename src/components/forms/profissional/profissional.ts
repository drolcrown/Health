import { Component } from '@angular/core';
import { AccessFirebaseProvider } from '../../../providers/access-firebase/access-firebase';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { UFs } from '../../../models/uf';
import { LoginPage } from '../../../pages/login/login';
import { NavController } from 'ionic-angular';
import { AlertsProvider } from '../../../providers/alerts/alerts';
import { DatePipe } from '@angular/common';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { FormsComponent } from '../forms';

@Component({
  selector: 'profissional-form',
  templateUrl: 'profissional.html'
})
export class ProfissionalComponent {
  private form: FormGroup;
  private _usuario;
  private especialidades = [];
  private profissao = [];
  private _estados = UFs;
  private formInvalido = "";

  constructor(private builder: FormBuilder, private navCtrl: NavController,
    private alerta: AlertsProvider, private datePipe: DatePipe, private params: NavParams,
    private provider: AccessFirebaseProvider, private authorization: AngularFireAuth) {
    let espec: Array<any> = params.get('especialidades');
    espec.forEach(el => {
      this.especialidades = this.especialidades.concat(Object.values(el)[0]);
    });


    this.profissao = params.get('profissao');
    this._usuario = params.get('usuario');

    this.form = this.builder.group({
      avaliacao: [5],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      data: ['', Validators.required],
      peso: ['', (this._usuario == 'paciente' ? Validators.required : null)],
      altura: ['', (this._usuario == 'paciente' ? Validators.required : null)],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      imagem: [''],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      especialidades: [''],
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
              this.navCtrl.push(LoginPage);
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
    this.navCtrl.push(FormsComponent);
  }
}
