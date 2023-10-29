import 'ionicons';
import { Component, OnInit} from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AutheticationService } from './authetication.service';
import { AvatarService } from 'src/app/avatar.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  selectedAvatar: string = '';
  email :any
  constructor(
    public router: Router,
    public platform: Platform,    
    private authService:AutheticationService,
    private avatarService: AvatarService
  ) {
    this.routesDefault();
  }

  ngOnInit(): void {

    this.avatarService.selectedAvatar$.subscribe((avatar) => {
      this.selectedAvatar = avatar; // Actualizar la variable cuando cambie la imagen
    });
      this.authService.getProfile().then((user) =>{
        this.email = user?.email
        console.log(user);
      })
  }

  signOut(){
    this.authService.signOut().then(() =>{
      this.router.navigate(['/login'])
    })
  }

  routesDefault() {
    this.platform.ready().then(() => {
      this.router.navigateByUrl('/splash'); // Cambié 'Splash' a '/splash' si es una ruta válida en tu aplicación.
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
