import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { StarRatingModule } from 'ionic3-star-rating';

//Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { AtendimentoPage } from '../pages/atendimento/atendimento';

//Components
import { HeaderComponent } from '../components/core/header/header';
import { FormsComponent } from '../components/forms/forms';
import { ProfissionalComponent } from '../components/forms/profissional/profissional';

//Providers
import { AccessFirebaseProvider } from '../providers/access-firebase/access-firebase';
import { AlertsProvider } from '../providers/alerts/alerts';
import { AcountPage } from '../pages/acount/acount';
import { TestPage } from '../pages/test/test';

@NgModule({
  declarations: [
    MyApp, LoginPage, HeaderComponent,TestPage,
    HomePage, AtendimentoPage, ListPage, AcountPage,
    FormsComponent, ProfissionalComponent,

  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule,
    StarRatingModule,
    AngularFirestoreModule,
    IonicModule.forRoot(MyApp), 
    AngularFireModule.initializeApp(environment.FirebaseConfig),
    AngularFireDatabaseModule, AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, LoginPage, HeaderComponent,TestPage,
    HomePage, AtendimentoPage, ListPage, AcountPage,
    FormsComponent, ProfissionalComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen, Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AccessFirebaseProvider,
    AlertsProvider,
  ]
})
export class AppModule { }
