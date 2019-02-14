import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CacheProvider } from '../../providers/cache/cache';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { UFs } from '../../models/uf';
import { HomePage } from '../home/home';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';

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
  private _tipos = ["Apartamento", "Casa", "República"];
  private _sexo = ["Feminino", "Masculino"];
  private _estados = UFs;
  private muniON = false;
  private _municipios = [];
  private anuncio = {
    estado: "",
    municipio: "",
    bairro: "",
    data: new Date(),
    email: "",
    imagem: [
      "../../assets/icon/photo-camera.svg",
    ],
    tipo: "",
    filtros: {
      sexo: null,
      idade: null
    },
    preco: "",
    nome: "",
    telefone: ""
  };

  constructor(public navCtrl: NavController, public provider: AccessFirebaseProvider,
    public builder: FormBuilder, public cache: CacheProvider, public navParams: NavParams) {
    this.anuncio.email = navParams.get("usuario").email;
    this.form = builder.group(this.anuncio);
  }

  public getMunicipio(value) {
    if (value) {
      this._estados.filter(el => {
        if (el.nome == value) {
          this._municipios = el.municipios;
          this.muniON = true;
          return;
        }
      });
    } else {
      this.muniON = false;
    }
  }

  public logIn() {
    this.provider.save("anuncio", this.form.value).subscribe(() => {
      this.navCtrl.push(HomePage);
    });
  }


}
