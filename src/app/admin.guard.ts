import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {constructor(private firebaseService: FirebaseService, private router: Router){}
canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.firebaseService.currentUser;
    
    if(currentUser){
      //check if the route is retricted by role

      if(next.data.roles && currentUser.adminRoles.indexOf(next.data.roles) === -1){
        //role not authorized
        
        return false;
      
      }else{ 
        
        
        return true;
      }
    }else {
      return false;
      }

    
  }
}
