import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { AcountPage } from '../pages/acount/acount';
import { CacheProvider } from '../providers/cache/cache';
import { ListComponent } from '../components/list/list';
import { AccessFirebaseProvider } from '../providers/access-firebase/access-firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // rootPage: any = HomePage;
  rootPage: any = LoginPage;

  content;
  perfil;
  pages: Array<{ title: string, component: any, name: string }>;

  constructor(public platform: Platform, private provider: AccessFirebaseProvider,
    public statusBar: StatusBar, public splashScreen: SplashScreen,
    public cache: CacheProvider, private menuCtrl: MenuController) {
    this.pages = [
      { title: 'Home', component: HomePage, name: "HomePage" },
      // { title: 'Configurações', component: ListPage },
      { title: 'Conta', component: AcountPage, name: "AcountPage" },
      { title: 'ModoLista', component: ListComponent, name: "ListComponent" },
      { title: 'List', component: ListPage, name: "ListPage" },
      { title: 'Sair', component: LoginPage, name: "LoginPage" }
    ];
    this.initializeApp();
  }

  initializeApp() {
    this.loadPerfil();
    this.platform.registerBackButtonAction(() => {
      if (this.nav.length() <= 1) {
        this.platform.exitApp();
      } else {
        this.nav.pop();
      }
    });
    this.platform.ready().then(() => {
      // this.statusBar.backgroundColorByHexString('#ffffff');
      // this.splashScreen.hide();
      this.statusBar.show();
    });
  }

  loadPerfil() {
    console.log('eiei')
    this.cache.get("perfil").then(perfil => {
      this.perfil = perfil;
    })
  }

  public openPage(page: any) {
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
}
