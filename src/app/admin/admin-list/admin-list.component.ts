import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { AngularFirestore } from '@angular/fire/firestore';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { viewClassName } from '@angular/compiler';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FirebaseService } from 'src/app/firebase.service';
declare var $: any;
export interface Admin {
  id:string
  name:string;
  lastname: string;
  email: string;
  adminRoles: string;
 
}

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminListComponent implements OnInit {
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
  data=[];
  columnsToDisplay : string[] = ['Name','Lastname', 'Email', 'adminRoles','action'];
  dataSource =new MatTableDataSource<Admin>(this.data);
  expandedElement: Admin | null;
 
  constructor(private firestore: AngularFirestore, private firebaseservice:FirebaseService ) { 
    
  }
  
  loadData(){
    this.data=[]
    this.firestore.collection("users").ref.where("role", "==", "admin").get().then(snap=>{ console.log(snap)
      snap.forEach(userRef => {
          console.log("userRef", userRef.data());
          this.data.push( userRef.data() as any  )
          console.log(this.data);
          this.dataSource =new MatTableDataSource<Admin>(this.data)
          })
        })
    
   }
   onFormSubmit(user,adminlist:MatSlideToggle,clientlist:MatSlideToggle,admincontacts:MatSlideToggle,adminalerts:MatSlideToggle){
   var adminNewRoles=[]
   if(adminlist._inputElement.nativeElement.checked){adminNewRoles.push(this.sideRoles.adminlist)}
   if(clientlist._inputElement.nativeElement.checked){adminNewRoles.push(this.sideRoles.clientlist)}
   if(admincontacts._inputElement.nativeElement.checked){adminNewRoles.push(this.sideRoles.admincontacts)}
   if(adminalerts._inputElement.nativeElement.checked){adminNewRoles.push(this.sideRoles.adminalerts)}
   console.log(adminNewRoles)
    // this.firebaseservice.updateAdminRoles(user,adminNewRoles)
    let key:string="";
  this.firestore.collection("users").ref.where("id","==",user.id).get().then(querySnapshot => {
    querySnapshot.forEach(userRef=> { key=userRef.id})
    console.log("key",key)
    this.firestore.collection("users").doc(key).update( {
      "adminRoles": adminNewRoles
    }).then(data => {this.loadData()
                    this.showNotification('bottom','right','primary',"Les Roles de l'administration de "+ user.name+" sont modifiés.")}) 
    
   
  }) 
  
  }

  deleteAdmin(user){
    let key:string="";
  this.firestore.collection("users").ref.where("id","==",user.id).get().then(querySnapshot => {
    querySnapshot.forEach(userRef=> { key=userRef.id})
    console.log("key",key)
    this.firestore.collection("users").doc(key).update( {
      "adminRoles": [],
      "role":"user"
    }).then(data => {this.loadData()
                      this.showNotification('bottom','right','danger',user.name+" est supprimé de l'administration.")}) 
    
   
  }) 
  }
  ngOnInit() { this.loadData()}

  showNotification(from, align,color,message){
    const type = ['','info','success','warning','danger'];
  
    
  
    $.notify({
        icon: "notifications",
        message: message
  
    },{
        type: color,
        timer: 4000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-fill-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

}
