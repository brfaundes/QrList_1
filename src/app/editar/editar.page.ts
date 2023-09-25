import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})

export class EditarPage implements OnInit {
  public editar!: string;
  private activatedRoute = inject(ActivatedRoute);
  public showLabel: boolean = false;
  constructor() {}

  ngOnInit() {
    this.editar = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
  toggleLabel() {
    this.showLabel = !this.showLabel;
  }
}
