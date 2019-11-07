import { User } from '../user/user.model';
import { Thread } from '../thread/thread.model';
import { Message } from '../message/message.model';
import { MessagesService } from '../message/messages.service';
import { ThreadsService } from '../thread/threads.service';
import { UsersService } from '../user/users.service';
import * as moment from 'moment';
import { DataService } from './data.service';
import { map } from 'rxjs/operators';

const me: User      = new User('Juliet', 'assets/images/avatars/female-avatar-1.png');
const ladycap: User = new User('Lady Capulet', 'assets/images/avatars/female-avatar-2.png');
const echo: User    = new User('Echo Bot', 'assets/images/avatars/male-avatar-1.png');
const rev: User     = new User('Reverse Bot', 'assets/images/avatars/female-avatar-4.png');
const wait: User    = new User('Waiting Bot', 'assets/images/avatars/male-avatar-2.png');

const tLadycap: Thread = new Thread('tLadycap', ladycap.name, ladycap.avatarSrc);
const tEcho: Thread    = new Thread('tEcho', echo.name, echo.avatarSrc);
const tRev: Thread     = new Thread('tRev', rev.name, rev.avatarSrc);
const tWait: Thread    = new Thread('tWait', wait.name, wait.avatarSrc);


export class GetData {

    messages: Message[];
    msg: Message;
    usr: User;
    thr: Thread;
    dat: Date;
    txt: string;
    isr: boolean;

    constructor(public dataService: DataService) {
    }

    static init(messagesService: MessagesService,
                threadsService: ThreadsService,
                usersService: UsersService): void {
        // TODO make `messages` hot
        messagesService.messages.subscribe(() => ({}));
        // set "Juliet" as the current user
        usersService.setCurrentUser(me);

        // create the initial messages
        // initialMessages.map( (message: Message) => messagesService.addMessage(message) );

        // threadsService.setCurrentThread(tEcho);
        // this.setupBots(messagesService);

    }


    getMsgInfo(msg: Message) {
    this.usr = msg.author;
    this.thr = msg.thread;
    this.dat = msg.sentAt;
    this.txt = msg.text;
    this.isr = msg.isRead;
    }

    initialMessages: Array<Message> = [
    new Message({
        author: me,
        sentAt: moment().subtract(45, 'minutes').toDate(),
        text: 'Yet let me weep for such a feeling loss.',
        thread: tLadycap
    })
    ];



    getMessagesList() {
        this.dataService.getMessages().snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() }) )
            )
        ).subscribe(messages => {
            this.messages = messages;
        });
    
        // console.log("length: " + this.messages.length);
    }




 static setupBots(messagesService: MessagesService): void {

    // echo bot
    messagesService.messagesForThreadUser(tEcho, echo)
      .forEach( (message: Message): void => {
        messagesService.addMessage(
          new Message({
            author: echo,
            text: message.text,
            thread: tEcho
          })
        );
      },
                null);

    // reverse bot
    messagesService.messagesForThreadUser(tRev, rev)
      .forEach( (message: Message): void => {
        messagesService.addMessage(
          new Message({
            author: rev,
            text: message.text.split('').reverse().join(''),
            thread: tRev
          })
        );
      },
                null);

    // waiting bot
    messagesService.messagesForThreadUser(tWait, wait)
      .forEach( (message: Message): void => {

        let waitTime: number = parseInt(message.text, 10);
        let reply: string;

        if (isNaN(waitTime)) {
          waitTime = 0;
          reply = `I didn\'t understand ${message.text}. Try sending me a number`;
        } else {
          reply = `I waited ${waitTime} seconds to send you this.`;
        }

        setTimeout(
          () => {
            messagesService.addMessage(
              new Message({
                author: wait,
                text: reply,
                thread: tWait
              })
            );
          },
          waitTime * 1000);
      },
                null);


  }
}