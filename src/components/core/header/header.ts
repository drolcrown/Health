import { Component, Input } from '@angular/core';
import { MenuController, Nav, NavController } from 'ionic-angular';
import { CacheProvider } from '../../../providers/cache/cache';
import { AccessFirebaseProvider } from '../../../providers/access-firebase/access-firebase';
import { HomePage } from '../../../pages/home/home';
import { AcountPage } from '../../../pages/acount/acount';
import { ListComponent } from '../../list/list';
import { ListPage } from '../../../pages/list/list';
import { LoginPage } from '../../../pages/login/login';

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  private _title = 'Health';
  private _subtitle = 'Saude ao seu alcance!';
  private content;
  private perfil;
  private pages = [
    { title: 'Home', component: HomePage, name: "HomePage" },
    // { title: 'Configurações', component: ListPage },
    { title: 'Conta', component: AcountPage, name: "AcountPage" },
    { title: 'ModoLista', component: ListComponent, name: "ListComponent" },
    { title: 'List', component: ListPage, name: "ListPage" },
    { title: 'Sair', component: LoginPage, name: "LoginPage" }
  ];

  @Input()
  private set title(value) {
    if (value) {
      this._title = value;
    }
  }

  @Input()
  private set subtitle(value) {
    if (!value) {
      this._subtitle = '';
    }
  }

  constructor(public menuCtrl: MenuController, public cache: CacheProvider,
    public provider: AccessFirebaseProvider, public nav: NavController) {
    this.content = menuCtrl.get('unauthenticated').getContentElement();
    this.cache.get("perfil").then(perfil => {
      this.perfil = perfil;
    })
  }


  
  public openPage(page: any) {
    console.log(this.content)
    alert('sds')
    this.menuCtrl.enable(false);
    if (page.title == 'Sair') {
      this.provider.authorization.auth.signOut();
      this.cache.clear();
    }
    this.cache.get("page").then(pageActual => {
      if (page.name != pageActual) {
        this.nav.push(page.component);
        this.cache.save("page", page.name);
      }
    });
  }

  public enableMenu() {
    this.menuCtrl.enable(true, 'authenticated');
    this.menuCtrl.enable(false, 'unauthenticated');
    this.menuCtrl.toggle('authenticated');
  }

}
