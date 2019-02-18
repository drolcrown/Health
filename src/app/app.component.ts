import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AcountPage } from '../pages/acount/acount';
import { CacheProvider } from '../providers/cache/cache';
import { AccessFirebaseProvider } from '../providers/access-firebase/access-firebase';
import { ConversaPage } from '../pages/conversa/conversa';
import { MeusAnunciosPage } from '../pages/meus-anuncios/meus-anuncios';

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
      { title: 'Mensagens', component: ConversaPage, icon: "chatboxes", name: "ConversaPage" },
      { title: 'Meus Anuncios', component: MeusAnunciosPage, icon: "list", name: "MeusAnunciosPage" },
      { title: 'Sair', component: LoginPage, icon: "log-out", name: "LoginPage" }
    ];
    this.initializeApp();
  }

  initializeApp() {
    this.cache.get("usuario").then(perfil => {
      if (perfil) {
        this.perfil = perfil;
        this.rootPage = HomePage;
      } else {
        this.perfil = {
          nome: "Bem Vindo!",
          imagem: "../assets/imgs/usuario.png",
          sobrenome: ""
        };
        this.rootPage = LoginPage;
      }
      this.cache.save('load-perfil', false);
    });
    // this.rootPage = HomePage;
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
        this.cache.get("usuario").then(perfil => {
          this.perfil = perfil;
          this.cache.save('load-perfil', true);
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
