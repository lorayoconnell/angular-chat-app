import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

/**
 * provide a place where our application can learn about the
 * current user and also notify the rest of the application
 * if the current user changes
 */

@Injectable()
export class UsersService {
  
  currentUser: Subject<User> = new BehaviorSubject<User>(null);

  public setCurrentUser(newUser: User): void {
    this.currentUser.next(newUser);   // next method pushes a new value to the stream
  }

}

export const userServiceInjectables: Array<any> = [
  UsersService
];

