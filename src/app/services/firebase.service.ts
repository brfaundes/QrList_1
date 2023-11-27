import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firestore = inject(AngularFirestore);

//---- autentificacion -----

getAuth(){
  return this.getAuth();
}


//----- Base de datos -----

  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

}


