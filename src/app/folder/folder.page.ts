import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutheticationService } from '../authetication.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  user:any
  constructor(public route:Router, public authService:AutheticationService) {
    this.user = authService.getProfile()
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  async logout(){
    this.authService.signOut().then(() =>{
      this.route.navigate(['/login'])
    }).catch((error)=>{
      console.log(error);
    })
  }
}
