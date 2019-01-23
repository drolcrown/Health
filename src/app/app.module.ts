import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StarRatingModule } from 'ionic3-star-rating';
import { environment } from '../environments/environment';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

//Providers
import { AccessFirebaseProvider } from '../providers/access-firebase/access-firebase';
import { AlertsProvider } from '../providers/alerts/alerts';
import { AcountPage } from '../pages/acount/acount';
import { CacheProvider } from '../providers/cache/cache';
import { DatePipe } from '@angular/common';
import { LoadsProvider } from '../providers/loads/loads';
import { RenderProvider } from '../providers/render/render';
import { Camera } from '@ionic-native/camera';
import { LoginPage } from '../pages/login/login';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { ConfigurationAccountPage } from '../pages/configuration/configuration-account/configuration-account';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ProfissionaisPage } from '../pages/profissionais/profissionais';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    AcountPage,
    ConfigurationPage,
    ConfigurationAccountPage,
    ProfissionaisPage,
    LoginPage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    StarRatingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.FirebaseConfig),
    AngularFireDatabaseModule, AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    AcountPage,
    LoginPage,
    HomePage,
    TabsPage,
    ProfissionaisPage,
    ConfigurationAccountPage,
    ConfigurationPage,
  ],
  providers: [
    StatusBar,
    ScreenOrientation,
    SplashScreen, Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RenderProvider,
    AccessFirebaseProvider,
    AlertsProvider,
    DatePipe,
    LoadsProvider,
    CacheProvider
  ]
})
export class AppModule {}
