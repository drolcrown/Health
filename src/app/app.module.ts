import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicStorageModule } from '@ionic/storage';
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
import { CacheProvider } from '../providers/cache/cache';
import { DatePipe } from '@angular/common';
import { LoadsProvider } from '../providers/loads/loads';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { ListComponent } from '../components/list/list';

@NgModule({
  declarations: [
    MyApp, LoginPage, HeaderComponent,TestPage,
    HomePage, AtendimentoPage, ListPage, AcountPage,
    FormsComponent, ProfissionalComponent, ListComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule,
    StarRatingModule,
    BrMaskerModule,
    AngularFirestoreModule,
    IonicModule.forRoot(MyApp), 
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.FirebaseConfig),
    AngularFireDatabaseModule, AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, LoginPage, HeaderComponent,TestPage,
    HomePage, AtendimentoPage, ListPage, AcountPage,
    FormsComponent, ProfissionalComponent, ListComponent
  ],
  providers: [
    StatusBar,
    SplashScreen, Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AccessFirebaseProvider,
    AlertsProvider,
    CacheProvider,
    DatePipe,
    LoadsProvider
  ]
})
export class AppModule { }
