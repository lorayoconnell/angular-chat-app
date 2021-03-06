import { Component, Inject } from '@angular/core';
import { ChatExampleData } from './data/chat-example-data';
import { GetData } from '../app/data/get-data';
import { UsersService } from './user/users.service';
import { ThreadsService } from './thread/threads.service';
import { MessagesService } from './message/messages.service';
import { DataService } from './data/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService,
              public usersService: UsersService,
              public dataService: DataService) {
    ChatExampleData.init(messagesService, threadsService, usersService);
    //GetData.init(messagesService, threadsService, usersService);
  }
}
