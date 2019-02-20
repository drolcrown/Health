import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { LoginPage } from '../login/login';
import { CacheProvider } from '../../providers/cache/cache';
import { HomePage } from '../home/home';
import { UFs } from '../../models/uf';
import { ImageViewerController } from 'ionic-img-viewer';

@IonicPage()
@Component({
  selector: 'page-acount',
  templateUrl: 'acount.html',
})
export class AcountPage {
  private form: FormGroup;
  private perfil: any;
  private email: string;
  private PATH = 'usuario';
  private _estados = UFs;
  private _imageViewerCtrl;
  private estadoSelecionadoMun = [];

  constructor(private navCtrl: NavController, private navParams: NavParams,
    private menuCtrl: MenuController, private builder: FormBuilder,
    private provider: AccessFirebaseProvider, private providerCache: CacheProvider,
    imageViewerCtrl: ImageViewerController) {
    this._imageViewerCtrl = imageViewerCtrl;
  }

  async ionViewDidEnter() {
    this.providerCache.recoverUser().subscribe(response => {
      if (response) {
        this.form = this.builder.group(response);
        this.perfil = response;
        this.getMunicipio(this.perfil.estado);
      }
    });
  }

  private salvarAlteracao() {
    this.provider.update(this.PATH, this.form.value);
    this.providerCache.save(this.PATH, this.form.value);
  }

  private getMunicipio(value) {
    if (value) {
      if (this.perfil.estado !== value) {
        let control = new FormControl('');
        this.form.setControl('municipio', control);
      }
      this._estados.filter(el => {
        if (el.nome == value) {
          this.estadoSelecionadoMun = el.municipios;
          return;
        }
      });
    } else {
      this.estadoSelecionadoMun = [];
      return;
    }
  }

  private presentImage(myImage) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
  }

  private salvarArquivo(event) {
    this.provider.alert.newAlert().create({
      title: 'Alterar Imagem',
      message: 'Confirme para alterar a imagem',
      buttons: [
        {
          text: 'Alterar',
          handler: () => {
            let loading = this.provider.loadingCtrl.presentLoadingDefault();
            this.provider.upload(this.perfil, event)
              .subscribe((response) => {
                this.perfil.imagem = response;
                this.providerCache.remove(this.PATH);
                this.providerCache.remove("load-perfil");
                this.providerCache.save(this.PATH, this.perfil);
                this.providerCache.save("load-perfil", false);
                loading.dismiss();
              });
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ]
    }).present();
  }

  private trocarSenha(perfil) {
    this.perfil = this.provider.updatePassword(perfil);
    this.providerCache.remove(this.PATH);
    this.providerCache.save(this.PATH, perfil);
  }


  private excluirConta(perfil) {
    this.provider.excluirConta(perfil).subscribe(resp => {
      if (resp) {
        this.providerCache.clear();
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }

  private toggle() {
    this.menuCtrl.toggle();
  }
}
