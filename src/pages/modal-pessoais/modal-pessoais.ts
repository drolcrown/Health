import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsComponent } from '../../components/forms/forms';
import { DatePipe } from '@angular/common';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { LoginPage } from '../login/login';
import { ModalProfissionaisPage } from '../modal-profissionais/modal-profissionais';
import { UFs } from '../../models/uf';
import { CacheProvider } from '../../providers/cache/cache';

@IonicPage()
@Component({
  selector: 'page-modal-pessoais',
  templateUrl: 'modal-pessoais.html',
})
export class ModalPessoaisPage {
  private form: FormGroup;
  private _usuario;
  private formInvalido = "";
  private _estados = UFs;
  private profissional = [];

  constructor(private builder: FormBuilder, public navCtrl: NavController,
    public navParams: NavParams, public cache: CacheProvider,
    private datePipe: DatePipe, private provider: AccessFirebaseProvider) {
    this._usuario = navParams.get('usuario');
    this.form = builder.group({
      avaliacao: [5],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      data: ['', Validators.required],
      peso: ['', (this._usuario == 'paciente' ? Validators.required : null)],
      altura: ['', (this._usuario == 'paciente' ? Validators.required : null)],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      imagem: [(this._usuario == 'profissional' ? '../../../assets/imgs/profissional.png' : '../../../assets/imgs/usuario.png')],
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

  ionViewDidEnter() {
    if (this._usuario == 'profissional') {
      this.provider.getAll('profissional').subscribe(resp => {
        this.profissional = resp;
      });
    }
  }

  private registrar() {
    if (this.form.valid) {
      let objeto = this.form.value;
      objeto.senha = this.provider.encripty(this.form.controls.senha.value);
      objeto.confirmarSenha = this.provider.encripty(this.form.controls.confirmarSenha.value);
      if (objeto.confirmarSenha === objeto.senha) {
        this.provider.authorization.auth.createUserWithEmailAndPassword(objeto.email, objeto.senha)
          .then(resposta => {
            objeto.data = this.datePipe.transform(this.form.controls.data.value, 'dd/MM/yyyy');
            // if (this._usuario != 'profissional') {
            this.provider.save('perfil/', objeto).subscribe(resp => {
              this.navCtrl.push(LoginPage);
              this.provider.alert.showToast('Cadastro Realizado com Sucesso!!');
            })
            // } else {
            // this.navCtrl.push(ModalProfissionaisPage, { perfil: objeto });
            // }
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
