import 'ionicons';
import { Component, OnInit} from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AutheticationService } from './authetication.service';
import { AvatarService } from 'src/app/avatar.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MenuController } from '@ionic/angular';

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
    private avatarService: AvatarService,
    private afAuth: AngularFireAuth,
    private menuController: MenuController
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

    this.afAuth.authState.subscribe(user => {
      if (user) {
        // El usuario está autenticado, redirígelo a la página principal u otra página.
        // Por ejemplo:
        this.router.navigate(['/folder/inbox']);
      } else {
        this.platform.ready().then(() => {
          this.router.navigateByUrl('/splash'); 
        });
      }
  });}

  cerrarSesion() {
    this.afAuth.signOut().then(() => {
      
      this.menuController.close('menu');
      // Redirige al usuario al inicio de sesión
   
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
