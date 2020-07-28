import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [

  {
    path: "login",
    component:LoginComponent, 
    canActivate:[LoginGuard],
    pathMatch: "full"
  },
  {
    path: "register",
    component:RegisterComponent,
    canActivate:[LoginGuard],
    pathMatch: "full"
  },
  {
    path: "user",
    component: PagesComponent, canActivate:[AuthGuard],
    data: {roles: ["user"]},
    
    children: [
      {
        path: "#",
        canActivate:[AuthGuard],
        data: {roles: ["user"]},
        loadChildren:
          "./pages/pages.module#PagesModule"
      }
    ]
  },
  {
    path: "admin",
    component: AdminComponent,canActivate:[AuthGuard],
    data: {roles: ["admin"]},
    
    children: [
      {
        path: "#",
        canActivate:[AuthGuard],
        data: {roles: ["admin"]}, 
        loadChildren:
          "./admin/admin.module#AdminModule"
      }
    ]
  },  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
    
  },{path:"**", component:PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
