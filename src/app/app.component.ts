import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavParams, NavController, MenuController } from 'ionic-angular';
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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;


  rootPage: any = LoginPage;
  // rootPage: any = HomePage;
  // rootPage: any = TestPage;
  // rootPage: any = ListComponent;

  pages: Array<{ title: string, component: any, name: string, icon: string }>;

  constructor(public platform: Platform, private authorization: AngularFireAuth,
    public statusBar: StatusBar, public splashScreen: SplashScreen,
    public cache: CacheProvider, private menuCtrl: MenuController) {
    // this.cache.clear();
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, name: "HomePage", icon: "home" },
      { title: 'Conta', component: AcountPage, name: "AcountPage", icon: "person" },
      { title: 'ModoLista', component: ListComponent, name: "ListComponent", icon: "list" },
      { title: 'List', component: ListPage, name: "ListPage", icon: "search" },
      { title: 'Sair', component: LoginPage, name: "LoginPage", icon: "log-out" }
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
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      // this.statusBar.overlaysWebView(false);
      // this.statusBar.backgroundColorByHexString('#ffffff');
      // this.splashScreen.hide();
      this.statusBar.show();
    });
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
        this.nav.push(page.component);
        this.cache.save("page", page.name);
      }
    });
  }
}
