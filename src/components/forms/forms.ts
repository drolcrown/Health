import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfissionalComponent } from './profissional/profissional';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';

@Component({
  selector: 'forms',
  templateUrl: 'forms.html'
})
export class FormsComponent {
  constructor(private navCtrl: NavController, private provider: AccessFirebaseProvider) { }

  public registrar(nome) {
    if (nome == 'profissional') {
      this.provider.getAll('especialidades').subscribe(espec => {
        this.provider.getAll('profissional').subscribe(prof => {
          this.navCtrl.push(ProfissionalComponent, { usuario: nome, especialidades: espec, profissao: prof});
        });
      });
    } else {
      this.navCtrl.push(ProfissionalComponent, { usuario: nome, especialidades: [], profissao: []});
    }
  }
}
