import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
    
  },
  {
    path: "login",
    component:LoginComponent, 
    pathMatch: "full"
  },
  {
    path: "register",
    component:RegisterComponent,
    pathMatch: "full"
  },
  {
    path: "",
    component: PagesComponent, 
    children: [
      {
        path: "#",
        loadChildren:
          "./pages/pages.module#PagesModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
