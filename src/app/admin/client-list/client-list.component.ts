import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/firebase.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

declare var $: any;

export interface Client {
  id:string;
  name:string;
  lastname: string;
  email: string;
  secureId: string;
 
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogOverviewExampleDialog {
  newSecureId:string =""  
  
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
export interface DialogData {
  email: string;
  newSecureId: string;
}


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
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
  displayedColumns: string[] = ['Name','Lastname', 'Email', 'secureId','action'];
  dataSource =new MatTableDataSource<Client>(this.data);

  constructor(private firestore: AngularFirestore, private firebaseService:FirebaseService,public dialog: MatDialog) { }
  currentUser = this.firebaseService.currentUser;
  loadData(){
    this.data=[]
    this.firestore.collection("users").ref.where("role", "==", "user").get().then(snap=>{ console.log(snap)
      snap.forEach(userRef => {
          console.log("userRef", userRef.data());
          this.data.push( userRef.data() as any  )
          console.log(this.data);
          this.dataSource =new MatTableDataSource<Client>(this.data)
          })
        })
    
   }
   defineAdmin(user){  let key:string="";
   this.firestore.collection("users").ref.where("id","==",user.id).get().then(querySnapshot => {
     querySnapshot.forEach(userRef=> { key=userRef.id})
     console.log("key",key)
     this.firestore.collection("users").doc(key).update( {
       "role": "admin"
     }).then(data => {this.loadData();
                      this.showNotification('bottom','right',user.name + " est nommé en tant q'un Administrateur")}) 
     
    
   }) }
   checkallDvices(element:any){
     this.firebaseService.getAllDevices(element.secureId)
    }

   addSecureId(element:any){
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {email: element.email, secureId: element.secureId}
    });

    dialogRef.afterClosed().subscribe(result => {
     
      
     
        this.firebaseService.addNewSecureIdClient( result , element.email,element.secureId)
      
      


    });

   }
  



  ngOnInit() { this.loadData()}

  showNotification(from, align,message){
    const type = ['','info','success','warning','danger'];
  
    
  
    $.notify({
        icon: "notifications",
        message: message
  
    },{
        type: 'success',
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










