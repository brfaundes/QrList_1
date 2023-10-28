import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from '../authetication.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  regForm : FormGroup


  constructor(public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public authService:AutheticationService) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
        nombreUsuario :['', [Validators.required]],
        email :['', [
          Validators.required,
          Validators.email,
          Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),
        ]],
        //"Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
        password:['',[ 
          Validators.required,
          Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[0-8])(?=.*[A-Z]).{8,}")
      ]]
    })
  }

  get errorControl(){
    return this.regForm?.controls;
  }

  async registro(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if(this.regForm?.valid){
      //const user = await this.authService.registerUser(email,password)
    }
  }

}
