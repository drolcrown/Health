import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

<<<<<<< HEAD
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

//Pages
=======
>>>>>>> parent of c59af5c... Adicionando primeiras telas'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

<<<<<<< HEAD
//Components
import { HeaderComponent } from '../components/core/header/header';
import { FormsComponent } from '../components/forms/forms';
import { ProfissionalComponent } from '../components/forms/profissional/profissional';
import { PacienteComponent } from '../components/forms/paciente/paciente';

//Providers
import { AccessFirebaseProvider } from '../providers/access-firebase/access-firebase';
import { AlertsProvider } from '../providers/alerts/alerts';
import { AcountPage } from '../pages/acount/acount';

@NgModule({
  declarations: [
    MyApp, LoginPage, HeaderComponent,
    HomePage, AtendimentoPage, ListPage, AcountPage,
    FormsComponent, PacienteComponent, ProfissionalComponent,

=======
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
>>>>>>> parent of c59af5c... Adicionando primeiras telas'
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
<<<<<<< HEAD
    MyApp, LoginPage, HeaderComponent,
    HomePage, AtendimentoPage, ListPage, AcountPage,
    FormsComponent, PacienteComponent, ProfissionalComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen, Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AccessFirebaseProvider,
    AlertsProvider
=======
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
>>>>>>> parent of c59af5c... Adicionando primeiras telas'
  ]
})
export class AppModule {}
