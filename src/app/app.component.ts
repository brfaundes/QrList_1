import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AvatarService } from 'src/app/avatar.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  selectedAvatar: string = '';

  constructor(
    public router: Router,
    public platform: Platform,
    private avatarService: AvatarService
  ) {
    this.routesDefault();
  }

  ngOnInit() {
    this.avatarService.selectedAvatar$.subscribe((avatar) => {
      this.selectedAvatar = avatar; // Actualizar la variable cuando cambie la imagen
    });
  }

  routesDefault() {
    this.platform.ready().then(() => {
      this.router.navigateByUrl('/splash');
    });
  }

  setProfilePicture(image: string) {
    this.avatarService.setSelectedAvatar(image);
  }

  public appPages = [
    { title: 'Perfil', url:'/perfil', icon: 'person-circle' },
    { title: 'Inicio', url: '/folder/inbox', icon: 'home' },
    { title: 'Ver lista', url: '/lista', icon: 'eye' },
    { title: 'Escanear', url: '/escaner-qr', icon: 'information-circle' },
  ];
}
