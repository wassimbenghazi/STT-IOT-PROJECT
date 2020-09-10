import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/firebase.service';
declare var $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private firestore: AngularFirestore,private firebaseService: FirebaseService) { }

  ngOnInit() { this.loadData()
  }
  replys=[]
  contact:string=""
  sendContact(){
    
    this.firebaseService.sendContact(this.contact)
    this.showNotification('bottom','right')
  }
  loadData(){
    this.replys=[]
    this.firestore.collection("AdminReply").ref.where("id", "==", this.firebaseService.currentUser.id).onSnapshot(snap=>{ 
      snap.forEach(userRef => {
          console.log("AdminReply", userRef.data());
          this.replys.push( userRef.data() as any  )

          
          
          })
          
        })
      
      }
  // ngAfterViewInit() {
  //                     this.loadData()
  //                   }
 




  showNotification(from, align){
    const type = ['','info','success','warning','danger'];
  
    const color = Math.floor((Math.random() * 4) + 1);
  
    $.notify({
        icon: "notifications",
        message: "Votre message a été envoyé, vous serez bientôt contacté :)"
  
    },{
        type: type['info'],
        timer: 4000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
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
