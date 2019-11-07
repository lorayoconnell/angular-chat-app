import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Message } from '../message/message.model';
import { MessagesService } from '../message/messages.service';
import { threadsServiceInjectables } from '../thread/threads.service';
import { stringify } from 'querystring';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dbPath = '/messages';
  messagesRef: AngularFireList<Message> = null;
  messages: Message[];

  constructor(private db: AngularFireDatabase) {
    this.messagesRef = db.list(this.dbPath);
  }



// was able to upload messages to the firebase database,
// but it was creating a new message every time

// like the todo app, should have "create item"
// as well as "update item"

uploadMessage(msg: Message): void {
 // this.messagesRef.push(msg);

  //key = msg.id;

  
  this.updateMessage(msg.id, msg.isRead);
  this.updateMessage(msg.id, msg.sentAt);
  this.updateMessage(msg.id, msg.text);

 // this.updateMessage(msg.id, msg.author);
  //  this.updateMessage(msg.id, msg.thread);



}



createMessage(msg: Message): void {
  this.messagesRef.push(msg);
}

updateMessage(key: string, value: any): Promise<void> {
  return this.messagesRef.update(key, value);
}

getMessages(): AngularFireList<Message> {
  return this.messagesRef;
}

deleteAll(): Promise<void> {
  return this.messagesRef.remove();
}


}


/*
  



  uploadMessage(message: Message): void {
    console.log("inside uploadMessage");
    //this.messagesRef.push(message);
  }

  getMessages(): AngularFireList<Message> {
    return this.messagesRef;
  }


}
*/