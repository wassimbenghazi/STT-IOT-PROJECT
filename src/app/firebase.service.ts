import { Injectable ,NgZone} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from "@angular/router";
import { AngularFirestore , AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable, BehaviorSubject, Timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  
  constructor(private ngZone: NgZone, private afAuth: AngularFireAuth, private firestore: AngularFirestore , private router: Router) { }

  public currentUser: any;
  public userStatus: string;
  public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);
  public userDoc:AngularFirestoreDocument<any>

  setUserStatus(userStatus: any): void {
    this.userStatus = userStatus;
    this.userStatusChanges.next(userStatus);
  }

  
  sendContact(contact:string){
    let myContact = {
      id: this.currentUser.id,
      message:contact,
      seen:"Not yet"
     }
     let keys=[]
    this.firestore.collection("Messages").add(myContact).then(querySnapshot =>{
    this.firestore.collection("AdminReply").ref.where("id","==",this.currentUser.id).get().then(querySnapshot => {
      querySnapshot.forEach(userRef=> { 
       keys.push( userRef.id as string  )
      
        })
        for (var val of keys) {
          this.firestore.collection("AdminReply").doc(val).delete()
        }
        
     
    }) })
       
  }

  signUp(email:string, password:string, name:string, lastname:string){
  
    
    this.afAuth.createUserWithEmailAndPassword(email, password)
     .then((userResponse)=>{
       // add the user to the "users" database
       let user = {
        id: userResponse.user.uid,
        email: userResponse.user.email,
        role: "user",
        name:name,
        lastname:lastname,
        secureId:[],
        adminRoles:[]
       }
       
       //add the user to the database
       this.firestore.collection("users").add(user)
       .then(user => {
        user.get().then(x => {
          //return the user data
          console.log(x.data());
          this.currentUser = x.data();
          this.setUserStatus(this.currentUser);
          if(x.data().role !== "admin") {
            this.router.navigate(["/#/dashboard"]);
          }else{
            this.router.navigate(["/#/dashboard"]);
          }
          
         
        })
       }).catch(err => {
         console.log(err);
       })
       
      
     })
     .catch((err)=>{
        console.log("An error ocurred: ", err);
     })
 
    }

    login(email: string, password: string) {
      
      this.afAuth.signInWithEmailAndPassword(email, password)
      .then((user)=>{
        this.firestore.collection("users").ref.where("email", "==", user.user.email).onSnapshot(snap =>{
          snap.forEach(userRef => {
            console.log("userRef", userRef.data());
            this.currentUser = userRef.data();
            //setUserStatus
            this.setUserStatus(this.currentUser)
            if(userRef.data().role !== "admin") {
              this.router.navigate(["/user/#/dashboard"]);
            }else{
              this.router.navigate(["/admin/#/dashboard"]);
            }
          })
        })
       
      }).catch(err => err)
  }

  logOut(){
    this.afAuth.signOut()
    .then(()=>{
      console.log("user signed Out successfully");
      //set current user to null to be logged out
      this.currentUser = null;
      //set the listenener to be null, for the UI to react
      this.setUserStatus(null);
      this.ngZone.run(() => this.router.navigate(["/login"]));

    }).catch((err) => {
      console.log(err);
    })
  }


  userChanges(){
    this.afAuth.onAuthStateChanged(currentUser => {
      if(currentUser){
        this.firestore.collection("users").ref.where("username", "==", currentUser.email).onSnapshot(snap =>{
          snap.forEach(userRef => {
            this.currentUser = userRef.data();
            //setUserStatus
            this.setUserStatus(this.currentUser);
            console.log(this.userStatus)
            
            if(userRef.data().role !== "admin") {
             this.ngZone.run(() => this.router.navigate(["/admin/user-profile"]));
            }else{
             this.ngZone.run(() => this.router.navigate(["/admin/table-list"])); 
            }
          })
        })
      }else{
        //this is the error you where looking at the video that I wasn't able to fix
        //the function is running on refresh so its checking if the user is logged in or not
        //hence the redirect to the login
        this.ngZone.run(() => this.router.navigate(["/login"]));
      }
    })
  }
  
  getAllDevices(secureIdList:Array<string>){
    secureIdList.forEach(sid => {
      let listDevices=[]
      let device:any
      let carte = {secureId :"" , devices:[]}
    
         this.firestore.collection("temperature").ref.where("secureId","==",sid).get().then(data => {data.forEach(temp => {
         device = temp.data()
         if(listDevices.indexOf(device.deviceName) === -1){listDevices.push(device.deviceName)}
         })
         carte = {secureId : sid , devices:listDevices}
         this.firestore.collection("carte").add(carte)
         })
      
    });
  }
  addNewSecureIdClient(newSecureId:string,email:string, secureIdList:Array<string>){
    let key:string
    this.firestore.collection("users").ref.where("email","==",email).get().then(data =>{
      data.forEach(element=>{ key= element.id})
      secureIdList.push(newSecureId)
      this.firestore.collection("users").doc(key).update( {
        "secureId": secureIdList
      }) 

    })
  }
  getAllTempObjects(){
    let carte:any
    let key:any
    let listOfTemp=[]
    let listDeviceTemp=[]
    let temperaturePoint=[]
    let device ={name:"" , data:[]}
    
    this.currentUser.secureId.forEach(sid => {
      
      this.firestore.collection("carte").ref.where("secureId","==",sid).get().then(
        data => { data.forEach( c => {
          carte = c.data()
          carte.devices.forEach(element => {
            
            
            this.firestore.collection("temperature").ref.where("secureId","==",sid).get()
            .then(data1 => {
              listDeviceTemp=[]
              data1.forEach( element1 =>{ 
                
              if(element1.data().deviceName === element){
                let date = new Date(element1.data().time)
                date.setHours( date.getHours() + 1 )
              temperaturePoint = [Date.parse(date.toString()) , element1.data().temperature]
              listDeviceTemp.push(temperaturePoint)
              
            }


            })
            console.log("Device Name" , element ,  listDeviceTemp)
            device ={name: "Secure Id : " + sid +" / Device Name : " + element , data : listDeviceTemp}
            listOfTemp.push(device)
          })
            
          });

        })}
      )
      
    });     
    
    return listOfTemp
  }
  
  updateAdminRoles(user,rolesList){let key:string="";
  
  this.firestore.collection("users").ref.where("id","==",user.id).get().then(querySnapshot => {
    querySnapshot.forEach(userRef=> { key=userRef.id})
    console.log("key",key)
    this.firestore.collection("users").doc(key).update( {
      "adminRoles": rolesList
    }) 
    this.ngZone.run(() => this.router.navigate(["/admin/#/admin-list"]));
   
  }) 
  
 
  }

  sendReply(reply,id){
    let myReply = {
      id: id,
      reply:reply,
     }
     
     let keys=[]

     this.firestore.collection("AdminReply").add(myReply).then(querySnapshot1 => {
      this.firestore.collection("Messages").ref.where("id","==",id).get().then(querySnapshot => {
        querySnapshot.forEach(userRef=> { 
         keys.push( userRef.id as string  )
        
          })
          for (var val of keys) {
            this.firestore.collection("Messages").doc(val).delete()
          }
          
       
      }) 
          
    })
    
  }



  deleteUser(user:any){
    this.userDoc= this.firestore.doc(`users/lF7UaGNMFsS0XoNb8tlK`)
    this.userDoc.delete()
    // this.firestore.collection("users").remove()
      // snap.forEach(userRef => {userRef.delete()})})
    // this.firestore.collection("users").doc(user.id).delete()
   
    // var user = this.afAuth.auth().currentUser;
  }
}
