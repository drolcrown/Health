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


  ionViewWillEnter() {
    // this.buttons.height = window.screen.height * 0.42 + 'px';

    var hash = sha256.create();
    hash.update('rafaeelel');
    hash.hex();
    console.log(hash.hex())
    hash.update('4459d379dd1cc9f260b2526594b9700f5826b0ed0ccb3ee6f9c19a3c8d819c60');
    hash.hex();
    console.log(hash.hex())
    
  }

  save(path, objeto: any) {
    this.service.findObject(path, "email", "rafaelsoec@gmail.com").subscribe(r => console.log(r))
    // this.service.save(path, objeto);
    // this.service.remove(path, objeto);
  }

}
