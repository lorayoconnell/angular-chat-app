import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
//import { first } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:Observable<firebase.User>;
  userDetails: firebase.User = null;
  signedIn: boolean = false;
  
  constructor(private afAuth: AngularFireAuth, private router:Router ) {
    this.signedIn = !!sessionStorage.getItem('chat-app-user');
    this.user = afAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) { this.userDetails = user; }
        else { this.userDetails = null; }
      }
    );
  }

  isSignedIn() {
    return this.signedIn;
  }

  logIn(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then( res => {
      this.signedIn = true;
      sessionStorage.setItem('chat-app-user', email);
      this.router.navigate(['']);
    }).catch(err => {
      this.signedIn = false;
      sessionStorage.removeItem('chat-app-user');
      this.router.navigate(['/login',{error:'1'}]);
    });
  }

  logOut() {
    this.afAuth.auth.signOut().then(() => {
      sessionStorage.removeItem('chat-app-user');
      this.signedIn = false;
        this.router.navigate(['/login']);
    });
  }

}
