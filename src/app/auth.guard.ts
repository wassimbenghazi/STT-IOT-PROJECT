import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private firebaseService: FirebaseService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this.firebaseService.currentUser;
      if(currentUser){
        //check if the route is retricted by role
  
        if(next.data.roles && next.data.roles.indexOf(currentUser.role) === -1){
          //role not authorized
          
          return false;
        
        }else{ 
          
          
          return true;
        }
      }else {
        return false;
        }
  
      
    }
    canActivateChild(
      
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        
        const currentUser = this.firebaseService.currentUser;
        if(currentUser){
          //check if the route is retricted by role
    
          if(next.data.roles && next.data.roles.indexOf(currentUser.role) === -1){
            //role not authorized
            
            this.router.navigateByUrl("/login").then(()=>{ console.log("redirected to login") ;return false;})
          }else{ 
            return true;
          }
        }else { 
          this.router.navigateByUrl("/login").then(()=>{ console.log("redirected to login") ;return false;})
          
          
        }
    
        
      }
        
      
    
  
      
   
  }