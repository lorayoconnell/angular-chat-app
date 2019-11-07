import { Component, Inject, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ThreadsService } from './../thread/threads.service';
import { MessagesService } from './../message/messages.service';
import { Thread } from './../thread/thread.model';
import { Message } from './../message/message.model';
import { combineLatest } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'chat-nav-bar',
  templateUrl: './chat-nav-bar.component.html',
  styleUrls: ['./chat-nav-bar.component.css']
})
export class ChatNavBarComponent implements OnInit {
  unreadMessagesCount: number;
  // signedIn: boolean;

  constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService,
              private authService: AuthService) {
  }

  ngOnInit(): void {

    // get message unread counts
    this.messagesService.messages.pipe(
      combineLatest(this.threadsService.currentThread,
        (messages: Message[], currentThread: Thread) => 
          [currentThread, messages] )
      ).subscribe(([currentThread, messages]: [Thread, Message[]]) => {
        this.unreadMessagesCount =
          _.reduce(
            messages,
            (sum: number, m: Message) => {
              const messageIsInCurrentThread: boolean = m.thread &&
                currentThread &&
                (currentThread.id === m.thread.id);
              // note: in a "real" app you should also exclude
              // messages that were authored by the current user b/c they've
              // already been "read"
              if (m && !m.isRead && !messageIsInCurrentThread) {
                sum = sum + 1;
              }
              return sum;
            },
            0);
      });

  }

  userSignedIn(): boolean {
    if (this.authService.isSignedIn())
      return true;
    else
      return false;
  }

  signOut(): void {
    this.authService.logOut();
  }

}
