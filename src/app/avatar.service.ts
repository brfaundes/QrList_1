import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  private selectedAvatarSubject = new BehaviorSubject<string>('');
  selectedAvatar$ = this.selectedAvatarSubject.asObservable();

  setSelectedAvatar(image: string) {
    this.selectedAvatarSubject.next(image);
  }
}
