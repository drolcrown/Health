import { Component } from '@angular/core';
import { MenuController, Nav, NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { AcountPage } from '../../pages/acount/acount';
import { ListComponent } from '../list/list';
import { ListPage } from '../../pages/list/list';
import { LoginPage } from '../../pages/login/login';
import { CacheProvider } from '../../providers/cache/cache';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';

/**
 * Generated class for the MenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {
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

  constructor(private menuCtrl: MenuController, public cache: CacheProvider,
    public provider: AccessFirebaseProvider, public nav: NavController) {
    this.content = menuCtrl.get('unauthenticated').getContentElement();
    this.menuCtrl.close('unauthenticated');
    this.cache.get("perfil").then(perfil => {
      this.perfil = perfil;
    })
  }

  openPage(page: any) {
    this.menuCtrl.enable(false);
    if (page.title == 'Sair') {
      this.provider.authorization.auth.signOut();
      this.cache.clear();
    }
    this.cache.get("page").then(pageActual => {
      if (page.name != pageActual) {
        this.nav.setRoot(page.component);
        this.cache.save("page", page.name);
      }
    });
  }

}
