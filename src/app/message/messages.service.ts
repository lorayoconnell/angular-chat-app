import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { scan, map, filter, publishReplay, refCount } from 'rxjs/operators';
import { User } from '../user/user.model';
import { Thread } from '../thread/thread.model';
import { Message } from '../message/message.model';
import { DataService } from '../data/data.service';

const initialMessages: Message[] = [];

interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}

@Injectable()
export class MessagesService {

  // a stream that publishes new messages only once
  newMessages: Subject<Message> = new Subject<Message>();
  // `messages` is a stream that emits an array of the most up to date messages
  messages: Observable<Message[]>;
  updates: Subject<any> = new Subject<any>();

  // action streams
  create: Subject<Message> = new Subject<Message>();
  markThreadAsRead: Subject<any> = new Subject<any>();

  //constructor() {
  constructor(private dataService: DataService) {

    this.messages = this.updates.pipe(
      scan((messages: Message[],
        operation: IMessagesOperation) => {
          return operation(messages);
        },
       initialMessages),
       publishReplay(1),
       refCount()
    );

      this.create.pipe(
        map(function(message: Message): IMessagesOperation {
          return (messages: Message[]) => {
            return messages.concat(message);
          };
        })
      ).subscribe( this.updates );

    this.newMessages.subscribe(this.create);

    this.markThreadAsRead.pipe(
      map((thread: Thread) => {
        return (messages: Message[]) => {
          return messages.map( (message: Message) => {
            // note that we're manipulating `message` directly here. Mutability
            // can be confusing and there are lots of reasons why you might want
            // to, say, copy the Message object or some other 'immutable' here
            if (message.thread.id === thread.id) {
              message.isRead = true;
            }
            return message;
          });
        };
      })
    ).subscribe(this.updates);

  }

  // an imperative function call to this action stream
  addMessage(message: Message): void {
    
    //console.log("messages.service.ts: addMessage: message.text: " + message.id);

    this.newMessages.next(message);

    //this.dataService.passMessage(message);
    //this.dataService.updateMessage(message.id, {});
    //this.dataService.uploadMessage(message);
    /*
    console.log("addMessage(): message.text: " + message.text
                            + " message.id: " + message.id
                            + " message.sentAt: " + message.sentAt
                            + " message.author.id: " + message.author.id
                            + " message.thread.id: " + message.thread.id
                            + " message.thread.name: " + message.thread.name
                            + " message.thread.avatarSrc: " + message.thread.avatarSrc);
    */
  }

  messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
    return this.newMessages.pipe(
      filter((message: Message) => {
                // belongs to this thread
        return (message.thread.id === thread.id) &&
                // and isn't authored by this user
                (message.author.id !== user.id);
        })
    );
  }
  
}

export const messagesServiceInjectables: Array<any> = [
  MessagesService
];
