import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"digimon-back","appId":"1:989691601532:web:f6421be74addae7d499ff9","storageBucket":"digimon-back.appspot.com","apiKey":"AIzaSyBplPJFmP1ry3pDbNrbT03Or65sps5L-n4","authDomain":"digimon-back.firebaseapp.com","messagingSenderId":"989691601532"})),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
