import { Component } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {
  permalink: string = ''; // for two-way-binding you need a global variable.

  onTitleChanged(event: any)  {
    const title = event.target.value;
    this.permalink = title.toLowerCase().replace(/\s+/g, '-');
  }

}
