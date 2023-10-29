import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule} from '@angular/fire/compat/auth'
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    AngularFireModule, provideFirebaseApp(() => initializeApp({"projectId":"qrlist-4a8dd","appId":"1:585353918886:web:ab6371b31002cdde95f767","storageBucket":"qrlist-4a8dd.appspot.com","apiKey":"AIzaSyBe71Sx5XoZPXPgsbr9UHes66iCWdsPgSk","authDomain":"qrlist-4a8dd.firebaseapp.com","messagingSenderId":"585353918886"})), provideAuth(() => getAuth()),
    AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
