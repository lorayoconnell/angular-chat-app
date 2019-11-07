import { Component, OnInit //, ElementRef
} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ThreadsService } from '../thread/threads.service';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { MessagesService } from '../message/messages.service';
import { UsersService } from '../user/users.service';
//import { ChatThreadComponent } from '../chat-thread/chat-thread.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  chatWindow: ChatWindowComponent;
  // chatThreadComponent: ChatThreadComponent;

  constructor(private authService: AuthService, public threadsService: ThreadsService,
      public messagesService: MessagesService, public usersService: UsersService) { }

  ngOnInit() {
  }

  openChatWindow() {

    //new ChatThreadComponent(this.threadsService);

    console.log("do something");
    //this.chatWindow.openChat();

    //new ChatWindowComponent(this.messagesService, this.threadsService, this.usersService, this.chatWin);


  }

}
