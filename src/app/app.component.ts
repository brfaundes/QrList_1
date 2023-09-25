import 'ionicons';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public router: Router,
    public platform: Platform
  ) {
    this.routesDefault();
  }

  routesDefault() {
    this.platform.ready().then(() => {
      this.router.navigateByUrl('/splash'); // Cambié 'Splash' a '/splash' si es una ruta válida en tu aplicación.
    });
  }

  public appPages = [
    { title: 'User _X', icon: 'person-circle' },
    { title: 'Inicio', url: '/folder/inbox', icon: 'home-outline' },
    { title: 'Ver lista', url: '/lista', icon: 'eye' },
    { title: 'Escanear', url: '/escaner-qr', icon: 'information-circle' },
  ];
}
