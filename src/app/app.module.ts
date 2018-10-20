import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';

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
import { PacienteComponent } from '../components/forms/paciente/paciente';

//Providers
import { AccessFirebaseProvider } from '../providers/access-firebase/access-firebase';
import { AlertsProvider } from '../providers/alerts/alerts';

@NgModule({
  declarations: [
    MyApp, LoginPage, HeaderComponent,
    HomePage, AtendimentoPage, ListPage,
    FormsComponent, PacienteComponent, ProfissionalComponent,

  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule,
    IonicModule.forRoot(MyApp), 
    AngularFireModule.initializeApp(environment.FirebaseConfig),
    AngularFireDatabaseModule, AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, LoginPage, HeaderComponent,
    HomePage, AtendimentoPage, ListPage,
    FormsComponent, PacienteComponent, ProfissionalComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AccessFirebaseProvider,
    AlertsProvider
  ]
})
export class AppModule { }
