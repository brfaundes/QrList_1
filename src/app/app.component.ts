import 'ionicons';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Nombre usuario', icon: 'person-circle'}, 
    { title: 'Inicio', url: '/folder/inbox' , icon: 'home' },
    { title: 'Ver lista', url: '/folder/favorites', icon: 'eye' },
    { title: 'Ayuda', url: '/folder/trash', icon: 'information-circle' },

  ];
  

  constructor() {}
  
}
