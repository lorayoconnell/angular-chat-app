import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
//import { Thread } from '../thread/thread.model';
//import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ThreadsService } from './../thread/threads.service';
//import { DataService} from '../data/data.service';
//import { map } from 'rxjs/operators';
//import { Message } from '../message/message.model';

@Component({
  selector: 'chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent {

  threads: Observable<any>;
  messages: any;

  constructor(public threadsService: ThreadsService) {
   this.threads = threadsService.orderedThreads;
  }


}
