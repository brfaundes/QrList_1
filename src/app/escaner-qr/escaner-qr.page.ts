import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-escaner-qr',
  templateUrl: './escaner-qr.page.html',
  styleUrls: ['./escaner-qr.page.scss'],
})
export class EscanerQRPage implements AfterViewInit {
  @ViewChild('videoElement') video!: ElementRef<HTMLVideoElement>;

  // Implementa el método ngAfterViewInit
  ngAfterViewInit(): void {
   this.prepareScanner()
   
  }

  async prepareScanner() {
    const avaible = this.chackCamera()
  }

  async chackCamera() {
    const cameraPermissions = await navigator.permissions.query({name:'camera'} as any)  
    console.log(cameraPermissions)
  }
}
