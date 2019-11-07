import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
//import { Thread } from '../thread/thread.model';
import { ThreadsService } from './../thread/threads.service';
import { DataService} from '../data/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent {
  threads: Observable<any>;
  messages: any;

  //constructor(public threadsService: ThreadsService, public dataService: DataService) {


  constructor(public threadsService: ThreadsService) {
    this.threads = threadsService.orderedThreads;
  //this.getMessagesList();

  }

/*
  getMessagesList() {
    this.dataService.getMessages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }) )
        )
    ).subscribe(messages => {
      this.messages = messages;
    });
  }
*/


}
