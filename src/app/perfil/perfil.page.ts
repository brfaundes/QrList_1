import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AvatarService } from 'src/app/avatar.service'; // Asegúrate de proporcionar la ruta correcta a tu servicio Avatar

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  selectedAvatar: string = '';
  characters = [];
  chunkedCharacters: any[] = [];

  constructor(
    private http: HttpClient,
    private avatarService: AvatarService // Agregar el servicio AvatarService
  ) { }

  ngOnInit() {
    this.http.get<any>('https://rickandmortyapi.com/api/character')
      .subscribe(res => {
        console.log(res);
        this.characters = res.results;
        this.chunkedCharacters = this.chunkArray(this.characters, 2);
      });
  }

  chunkArray(array: any[], size: number) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  }

  setProfilePicture(image: string) {
    this.avatarService.setSelectedAvatar(image);
  }
}
