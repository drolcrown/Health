import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { AcountPage } from '../pages/acount/acount';
import { CacheProvider } from '../providers/cache/cache';
import { AccessFirebaseProvider } from '../providers/access-firebase/access-firebase';
import { TestPage } from '../pages/test/test';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;


  rootPage: any;
  perfil;
  pages: Array<{ title: string, component: any, icon: string, name: string }>;

  constructor(public platform: Platform, private provider: AccessFirebaseProvider,
    public statusBar: StatusBar, public splashScreen: SplashScreen,
    public cache: CacheProvider, private menuCtrl: MenuController) {
    this.pages = [
      { title: 'Home', component: HomePage, icon: "home", name: "HomePage" },
      { title: 'Conta', component: AcountPage, icon: "person", name: "AcountPage" },
      // { title: 'Mensagens', component: ListComponent, icon: "list",name: "ListComponent" },
      { title: 'Mensagens', component: ListPage, icon: "chatboxes", name: "ListPage" },
      { title: 'Sair', component: LoginPage, icon: "log-out", name: "LoginPage" }
    ];
    this.initializeApp();
  }

  initializeApp() {
    this.cache.get("perfil").then(perfil => {
      if (this.perfil) {
        this.perfil = perfil;
        this.rootPage = HomePage;
      } else {
        this.perfil = {
          nome: "Bem Vindo!",
          imagem: "../assets/imgs/profissional.png",
          sobrenome: ""
        };
        this.rootPage = LoginPage;
      }
      this.cache.save('load-perfil', false);
    });
    // this.rootPage = TestPage;
    // this.rootPage = FormsComponent;
    this.platform.registerBackButtonAction(() => {
      if (this.nav.length() <= 1) {
        this.platform.exitApp();
      } else {
        this.nav.pop();
      }
    });
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#4FD5EC');
      // this.splashScreen.hide();
      this.statusBar.show();
    });
  }

  loadPerfil() {
    this.cache.get('load-perfil').then(load => {
      if (!load) {
        let loading = this.provider.loadingCtrl.presentLoadingDefault();
        this.cache.get("perfil").then(perfil => {
          this.perfil = perfil;
          this.cache.save('load-perfil', true);
          loading.dismiss();
        });
      }
    });
  }

  public openPage(page: any) {
    if (page.title == 'Sair') {
      this.provider.authorization.auth.signOut();
      this.cache.clear();
    }
    // this.cache.get("page").then(pageActual => {
    //   if (page.name != pageActual) {
    //     this.cache.save("page", page.name);
    //   }
    // });
    this.nav.setRoot(page.component);
  }
}
