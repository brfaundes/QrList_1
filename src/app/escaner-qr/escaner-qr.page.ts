import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { VIDEO_CONFIG } from './escaner-qr.const';
import { Subject } from 'rxjs';
import { timer } from 'rxjs';
import jsQR from 'jsqr';
import { takeUntil } from 'rxjs/operators'; 


@Component({
  selector: 'app-escaner-qr',
  templateUrl: './escaner-qr.page.html',
  styleUrls: ['./escaner-qr.page.scss'],
})
export class EscanerQRPage implements AfterViewInit, OnDestroy {
  @ViewChild('video', { static: true }) video: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  


  videoStream!: MediaStream

  config = JSON.parse(JSON.stringify(VIDEO_CONFIG));

  private destroy$ = new Subject<void>();

  // Implementa el método ngAfterViewInit
  ngAfterViewInit(): void {
    this.prepareScanner()

  }

  async prepareScanner() {
    const avaible = this.checkCamera()
    if (avaible) {
      this.startScanner()
    }
  }

  changeCamera() {
    let { facingMode } = this.config.video

    this.config.video.facingMode = facingMode === 'environment' ? 'user' : 'environment'
    this.startScanner()
  }

  async startScanner() {
    this.videoStream = await navigator.mediaDevices.getUserMedia(this.config);
    this.video.nativeElement.srcObject = this.videoStream;
  
    this.video.nativeElement.addEventListener('loadedmetadata', () => {
      this.spyCamera();
    });
  }
  

  spyCamera() {
    const videoElement = this.video?.nativeElement;
    const canvasElement = this.canvas?.nativeElement;
  
    if (videoElement && canvasElement) {
      const { clientWidth, clientHeight } = videoElement;
  
      if (clientWidth && clientHeight) {
        canvasElement.width = clientWidth;
        canvasElement.height = clientHeight;
  
        const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;
        canvasContext.drawImage(videoElement, 0, 0, clientWidth, clientHeight);
  
        const inversionAttempts = 'dontInvert';
  
        const image = canvasContext.getImageData(0, 0, clientWidth, clientHeight);
        const qrcode = jsQR(image.data, image.width, clientHeight, { inversionAttempts });
  
        if (qrcode) {
          const { data } = qrcode;
          console.log(data);
        } else {
          timer(500).pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.spyCamera(); // Llamada recursiva
          });
        }
      } else {
        console.error('clientWidth or clientHeight is undefined');
      }
    } else {
      console.error('Video element or Canvas element is undefined');
    }
  }
  
  
  


  async checkCamera() {
    const cameraPermissions = await navigator.permissions.query({ name: 'camera' } as any)
    console.log(cameraPermissions)

    const isOK = cameraPermissions.state !== "denied"

    const hasMediaDevice = 'mediaDevice' in navigator
    const hasUserMedia = 'getUserMedia' in navigator.mediaDevices

    if (!hasMediaDevice || (!hasUserMedia && isOK)) {

      return cameraPermissions.state !== "denied"
    }
  }


  ngOnDestroy() {
      this.videoStream.getTracks().forEach((track) => track.stop())
      this.video = null!

      this.destroy$.next()
      this.destroy$.complete()
  }
}
