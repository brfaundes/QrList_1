import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guardar',
  templateUrl: './guardar.page.html',
  styleUrls: ['./guardar.page.scss'],
})

export class GuardarPage implements OnInit {
  public guardar!: string;
  private activatedRoute = inject(ActivatedRoute);
 
  constructor() {}

  ngOnInit() {
    this.guardar = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

}