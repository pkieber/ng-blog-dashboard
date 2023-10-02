import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';
import { Subscriber } from '../models/subscriber';


@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent implements OnInit {
  subscribers: Subscriber[] = []; // Subscriber-interface


  constructor(private subService: SubscribersService) { }

  ngOnInit(): void {
    this.loadSubscribers();
  }

  loadSubscribers() {
    this.subService.loadSubscribers().subscribe((data: any) => {
      console.log(data);
      this.subscribers = data;
    });
  }

}
