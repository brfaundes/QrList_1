import { Component, OnInit } from '@angular/core';
import { AutheticationService } from '../authetication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {
  email:any
  constructor(public route:Router, public authService:AutheticationService) { }

  ngOnInit() {
  }

  async resetPassword(){
    this.authService.resetPassword(this.email).then(()=>{
      console.log('reset link sent')  
      this.route.navigate(['/login'])
    }

    ).catch((error) =>{
      console.log(error);
      
    })
  }

}
