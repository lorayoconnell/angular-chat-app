import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatNavBarComponent } from './chat-nav-bar/chat-nav-bar.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { FromNowPipe } from './pipes/from-now.pipe';
import { MessagesService } from './message/messages.service';
import { UsersService } from './user/users.service';
import { ThreadsService } from './thread/threads.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatMessageComponent,
    ChatNavBarComponent,
    ChatPageComponent,
    ChatThreadComponent,
    ChatWindowComponent,
    ChatThreadsComponent,
    FromNowPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [MessagesService,
              UsersService,
              ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
