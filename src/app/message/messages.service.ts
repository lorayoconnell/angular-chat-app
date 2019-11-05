import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, scan, map, publishReplay, refCount } from 'rxjs/operators';
import { Message } from '../message/message.model';
import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';

const initialMessages: Message[] = [];

interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}

@Injectable()
export class MessagesService {

  // a stream that publishes new messages only once
  newMessages: Subject<Message> = new Subject<Message>();

  // messages stream emits an array of the most recent messages
  messages: Observable<Message[]>;

  // `updates` receives _operations_ to be applied to our `messages`
  // it's a way we can perform changes on *all* messages (that are currently
  // stored in `messages`)
  updates: Subject<any> = new Subject<any>();
 
  // action streams
  create: Subject<Message> = new Subject<Message>();
  markThreadAsRead: Subject<any> = new Subject<any>();

  constructor() {
    this.messages = this.updates.pipe(
      scan((messages: Message[],  // watch the updates and accumulate operations on the messages
        operation: IMessagesOperation) => {
          return operation(messages);
        }, initialMessages),
        publishReplay(1),
        refCount()
    );

    // this stream will emit a function which accepts the
    // list of Messages and adds this Message to our list of messages.
    this.create.pipe(
      map(function(message: Message): IMessagesOperation {
        return (messages: Message[]) => {
          return messages.concat(message);
        };
      }) ).subscribe(this.updates);

      this.newMessages.subscribe(this.create);

      this.markThreadAsRead.pipe(
        map((thread: Thread) => {
          return (messages: Message[]) => {
            return messages.map( (message: Message) => {
              if (message.thread.id === thread.id) {
                message.isRead = true;
              }
              return message;
            });
          };
        }) ).subscribe(this.updates);
      
  }

  addMessage(message: Message): void {
    this.newMessages.next(message);
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
