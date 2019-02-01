import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavParams, NavController, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { AcountPage } from '../pages/acount/acount';
import { TestPage } from '../pages/test/test';
import { CacheProvider } from '../providers/cache/cache';
import { FormsComponent } from '../components/forms/forms';
import { ListComponent } from '../components/list/list';
import { AccessFirebaseProvider } from '../providers/access-firebase/access-firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // rootPage: any = HomePage;
  rootPage: any = LoginPage;
  loginPage: any = LoginPage;
  // rootPage: any = TestPage;
  // rootPage: any = ListComponent;

  pages: Array<{ title: string, component: any, name: string }>;

  constructor(public platform: Platform, private provider: AccessFirebaseProvider,
    public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events,
    public cache: CacheProvider, private menuCtrl: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, name: "HomePage" },
      // { title: 'Configurações', component: ListPage },
      { title: 'Conta', component: AcountPage, name: "AcountPage" },
      { title: 'ModoLista', component: ListComponent, name: "ListComponent" },
      { title: 'List', component: ListPage, name: "ListPage" },
      { title: 'Sair', component: LoginPage, name: "LoginPage" }
    ];

  }

  initializeApp() {
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

  openPage(page: any) {
    this.menuCtrl.enable(false);
    if (page.title == 'Sair') {
      this.provider.authorization.auth.signOut();
      this.cache.clear();
    }
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.cache.get("page").then(pageActual => {
      if (page.name != pageActual) {
        this.nav.push(page.component);
        this.cache.save("page", page.name);
      }
    });
  }
}
