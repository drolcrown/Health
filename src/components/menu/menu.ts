import { Component, Input } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { AcountPage } from '../../pages/acount/acount';
import { ListComponent } from '../list/list';
import { ListPage } from '../../pages/list/list';
import { LoginPage } from '../../pages/login/login';
import { MenuController, NavController, Nav } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { CacheProvider } from '../../providers/cache/cache';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {
  private nav;
  private perfil;

  @Input()
  private set cont(value) {
    this.nav = value;
    console.log(value)
  }

  pages: Array<{ title: string, component: any, name: string, icon: string }>;

  constructor(private menuCtrl: MenuController, private authorization: AngularFireAuth,
    private cache: CacheProvider) {
    this.cache.get("perfil").then(response => {
      this.perfil = response;
    });
    this.pages = [
      { title: 'Home', component: HomePage, name: "HomePage", icon: "home" },
      { title: 'Conta', component: AcountPage, name: "AcountPage", icon: "person" },
      { title: 'ModoLista', component: ListComponent, name: "ListComponent", icon: "list" },
      { title: 'List', component: ListPage, name: "ListPage", icon: "search" },
      { title: 'Sair', component: LoginPage, name: "LoginPage", icon: "log-out" }
    ];
  }

  ngAfterViewInit() {
  }

  toogleMenu() {
    if (this.menuCtrl.isEnabled()) {
      this.menuCtrl.enable(true);
    } else {
      this.menuCtrl.enable(false);
    }
  }

  openPage(page: any) {
    if (page.title == 'Sair') {
      this.authorization.auth.signOut();
      this.cache.clear();
    }
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.cache.get("page").then(pageActual => {
      if (page.name != pageActual || !pageActual) {
        this.nav.setRoot(page.component);
        this.cache.save("page", page.name);
      }
    });
  }

}
