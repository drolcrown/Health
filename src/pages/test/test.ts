import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { AlertsProvider } from '../../providers/alerts/alerts';
import { sha256, sha224 } from 'js-sha256';
/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
  private perfil = {
    avaliacao: 5,
    cidade: "Sao Luis",
    senha: "123456",
    confirmarSenha: "123456",
    cr: "",
    data: "3213-12-23",
    email: "rafa@gmail.com",
    estado: "Maranhao",
    nome: "Marcos Santos Souza",
    imagem: "",
    peso: "1.78",
    profissao: ""
  }

  constructor(public navCtrl: NavController,
    public service: AccessFirebaseProvider, public alert: AlertsProvider) {

    let tipos = [
      { lista: this.especialidades.assistencia, nome: 'assistencia' },
      { lista: this.especialidades.prevencao, nome: 'prevencao' },
      { lista: this.especialidades.estetica, nome: 'estetica' },
      { lista: this.especialidades.pets, nome: 'pets' }
    ];

    tipos.forEach(tipo => {
      tipo.lista.forEach(el => {
        this.service.save('especialidades/' + tipo.nome, el);
      });
    });
  }

  private pages = [
    { name: 'Assistencia em Saúde', image: "../../assets/imgs/pets3.jpg", icon: 'heart' },
    { name: 'Prevenção e Treinamento', image: "../../assets/imgs/treino.jpg", icon: 'medical' },
    { name: 'Beleza e Estética', image: "../../assets/imgs/treino.jpg", icon: 'people' },
    { name: 'Pets', image: "../../assets/imgs/pets3.jpg", icon: 'paw' },
  ];

  private buttons = {
    display: 'flex',
    height: window.screen.height * 0.42 + 'px',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // border: '1px solid blue'
  }


  especialidades = {
    assistencia: [
      { nome: "Cuidados Paliativos", descricao: "", profissionas: [] },
      { nome: "Constipação", descricao: "", profissionas: [] },
      { nome: "Disfunção Cognitiva", descricao: "", profissionas: [] },
      { nome: "Doença Cardiovascular", descricao: "", profissionas: [] },
      { nome: "Doenças Infectocontagiosas", descricao: "", profissionas: [] },
      { nome: "Doença Osteomuscular", descricao: "", profissionas: [] },
      { nome: "Doença Respiratoria", descricao: "", profissionas: [] },
      { nome: "Feridas", descricao: "", profissionas: [] },
      { nome: "Imobiliddade", descricao: "", profissionas: [] },
      { nome: "Infecção Trato Urinario", descricao: "", profissionas: [] },
      { nome: "Neoplasia", descricao: "", profissionas: [] },
      { nome: "Pós Cirurgico", descricao: "", profissionas: [] },
      { nome: "Pré Cirurgico", descricao: "", profissionas: [] },
      { nome: "Reabilitação Neurofunional e Motora", descricao: "", profissionas: [] },
      { nome: "Reabilitação Nutricional", descricao: "", profissionas: [] },
      { nome: "Sindrome da Fragilidade", descricao: "", profissionas: [] },
      { nome: "Sindrome Neurologica da Infancia ao Envelhecimento", descricao: "", profissionas: [] },
      { nome: "Transtorno Saude Mental", descricao: "", profissionas: ["psicologo"] },
      // "(opção descrever e escrever o profissional)"
    ],
    prevencao: [
      { nome: "Cuidados Paliativos Preventivos(acamados, pós / pré - cirúrgicos)", descricao: "", profissionas: [] },
      { nome: "Habilitação e Desempenho(atletas)", descricao: "", profissionas: [] },
      { nome: "Personal Trainer (Acompanhamento ginásio)", descricao: "", profissionas: [] },
      { nome: "Prevencao Doença e Dores Osteomusculares e Articulares", descricao: "", profissionas: [] },
      { nome: "Prevenção Contra Queda", descricao: "", profissionas: [] },
      { nome: "Precenção Contra Doenças Infectocontagiosas", descricao: "", profissionas: [] },
      { nome: "Treinamento para Prova Física", descricao: "", profissionas: [] },
    ],
    estetica: [
      { nome: "Cuidados Paliativos Preventivos(acamados, pós / pré - cirúrgicos)", descricao: "", profissionas: [] },
      { nome: "Habilitação e Desempenho(atletas)", descricao: "", profissionas: [] },
      { nome: "Personal Trainer (Acompanhamento ginásio)", descricao: "", profissionas: [] },
      { nome: "Prevencao Doença e Dores Osteomusculares e Articulares", descricao: "", profissionas: [] },
      { nome: "Prevenção Contra Queda", descricao: "", profissionas: [] },
      { nome: "Precenção Contra Doenças Infectocontagiosas", descricao: "", profissionas: [] },
      { nome: "Treinamento para Prova Física", descricao: "", profissionas: [] },
    ],
    pets: [
      { nome: "Cuidados Paliativos Preventivos(acamados, pós / pré - cirúrgicos)", descricao: "", profissionas: [] },
      { nome: "Habilitação e Desempenho(atletas)", descricao: "", profissionas: [] },
      { nome: "Personal Trainer (Acompanhamento ginásio)", descricao: "", profissionas: [] },
      { nome: "Prevencao Doença e Dores Osteomusculares e Articulares", descricao: "", profissionas: [] },
      { nome: "Prevenção Contra Queda", descricao: "", profissionas: [] },
      { nome: "Precenção Contra Doenças Infectocontagiosas", descricao: "", profissionas: [] },
      { nome: "Treinamento para Prova Física", descricao: "", profissionas: [] },
    ],
    outras: [
      { nome: "Cuidados Paliativos Preventivos(acamados, pós / pré - cirúrgicos)", descricao: "", profissionas: [] },
      { nome: "Habilitação e Desempenho(atletas)", descricao: "", profissionas: [] },
      { nome: "Personal Trainer (Acompanhamento ginásio)", descricao: "", profissionas: [] },
      { nome: "Prevencao Doença e Dores Osteomusculares e Articulares", descricao: "", profissionas: [] },
      { nome: "Prevenção Contra Queda", descricao: "", profissionas: [] },
      { nome: "Precenção Contra Doenças Infectocontagiosas", descricao: "", profissionas: [] },
      { nome: "Treinamento para Prova Física", descricao: "", profissionas: [] },
    ]

    // profissionais{
    // especialidades: []
  }


  save(path, objeto: any) {
    this.service.save('especialidades', this.especialidades);
    // this.service.remove(path, objeto);
  }

}
