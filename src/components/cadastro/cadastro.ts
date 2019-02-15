import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalPage } from '../../pages/modal/modal';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { initializeApp } from 'firebase';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { LoginPage } from '../../pages/login/login';
import { usuarios } from '../../models/usuarios';

/**
 * Generated class for the CadastroComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroComponent {
  private page = ModalPage;
  private form: FormGroup;
  private alerta = "";
  private buttonBack = "Sair";
  private buttonNext = "Próximo";
  private contador = 0;
  private conversa: {
    mensagem: string,
    inputs: Array<any>
  };
  private mensagens;

  constructor(private navCtrl: NavController, private builder: FormBuilder,
    public provider: AccessFirebaseProvider) {
    this.form = builder.group(usuarios);
    this.mensagens = [
      { mensagem: "Olá!!<br> Informe seu nome e sobrenome", inputs: [{ nome: "nome", label: "Nome", tipo: "text" }, { nome: "sobrenome", label: "Sobrenome", tipo: "text" }] },
      { mensagem: "Quando você nasceu?", inputs: [{ nome: "data", label: "Data de Nascimento", tipo: "date" }] },
      { mensagem: "Por favor, informe seu cpf", inputs: [{ nome: "cpf", label: "CPF", tipo: "cpf" }] },
      { mensagem: "Qual o estado e o município que você mora?", inputs: [{ nome: "estado", label: "Estado", tipo: "text" }, { nome: "municipio", label: "Município", tipo: "text" }] },
      { mensagem: "Falta pouco pra concluirmos!<br>Informe seu email", inputs: [{ nome: "email", label: "Email", tipo: "email" }] },
      { mensagem: "Ufa!! Demorou, mas está acabando.<br>Dê uma senha para sua nova conta!!", inputs: [{ nome: "senha", label: "Senha", tipo: "password" }, { nome: "confirmarSenha", label: "Confirme sua Senha", tipo: "password" }] }
    ];
    this.initialize();
    this.conversa.inputs.forEach(el => {
      this.gerarControl(el.nome);
    })
  }

  public initialize() {
    this.buttonBack = ((this.contador > 0) ? " Voltar" : "Sair");
    this.buttonNext = ((this.contador !== this.mensagens.length) ? " Próximo" : "Concluir");
    this.conversa = this.mensagens[this.contador];
    this.alerta = "";
  }

  public clearAlert() {
    this.alerta = "";
  }

  public gerarControl(nome) {
    let control = new FormControl('', Validators.required);
    this.form.setControl(nome, control);
  }

  goBack() {
    if (this.contador > 0) {
      this.contador--;
      this.initialize();
    } else {
      this.navCtrl.pop();
    }
  }

  goNext() {
    if (this.form.valid) {
      if (this.form.controls.senha.value === this.form.controls.confirmarSenha.value) {
        this.contador++;
        if (this.contador < this.mensagens.length) {
          this.initialize();
        } else {
          this.provider.save('usuario', this.form.value);
          this.navCtrl.setRoot(LoginPage);
        }
      } else {
        this.alerta = "Senha Diferentes!!";
      }
    } else {
      this.alerta = "Preencha todos os campos!!";
    }
  }
}
