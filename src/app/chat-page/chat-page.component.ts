import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../thread/threads.service';

@Component({
  selector: 'chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {

  constructor(public threadService:ThreadsService) { }

  ngOnInit() {

    
  }

}
