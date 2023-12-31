import { Component } from '@angular/core';
import { faClipboardList, faFileImage, faUsers } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  clipboardList = faClipboardList;
  fileImage = faFileImage;
  fileUsers = faUsers;
}

