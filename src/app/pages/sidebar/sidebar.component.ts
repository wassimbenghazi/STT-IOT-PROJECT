import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/firebase.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private firebaseService:FirebaseService) { }
  currentUser = this.firebaseService.currentUser;

  ngOnInit() {
  }
  logout(){this.firebaseService.logOut()}


}
