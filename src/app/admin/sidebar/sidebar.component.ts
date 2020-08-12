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
  sideRoles = {clientlist:"client-list" ,
               adminbuttons :"admin-buttons",
               admintables: "admin-tables",
               adminicons:"admin-icons",
               adminprogressbar:"admin-progressbar",
               adminlist:"admin-list",
               admintooltips:"admin-tooltips",
               admindropdowns:"admin-dropdowns",
               admintabs:"admin-tabs",
               adminbreadcrumbs:"admin-breadcrumbs",
               adminpagination:"admin-pagination",
               admintabels:"admin-tabels",
               adminalerts:"admin-alerts",
               admincontacts:"admin-contacts",
               adminbadges:"admin-badges",
               admintypography:"admin-typography"};
  ngOnInit() {
  }
logout(){this.firebaseService.logOut()}
}
