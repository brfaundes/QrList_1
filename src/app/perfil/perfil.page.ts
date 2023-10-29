import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AvatarService } from 'src/app/avatar.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  selectedAvatar: string = '';
  characters = [];
  chunkedCharacters: any[] = []; // Agregar la definición de chunkedCharacters

  constructor(
    private http: HttpClient,
    private avatarService: AvatarService
  ) { }

  ngOnInit() {
    this.http.get<any>('https://rickandmortyapi.com/api/character')
      .subscribe(res => {
        console.log(res);
        this.characters = res.results;
        this.chunkedCharacters = this.chunkArray(this.characters, 2); // Mostrar 4 elementos en cada iteración
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
