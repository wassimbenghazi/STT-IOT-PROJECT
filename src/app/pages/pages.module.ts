import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TablesComponent } from './tables/tables.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AccordionsComponent } from './accordions/accordions.component';
import { BadgesComponent } from './badges/badges.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { CarouselComponent } from './carousel/carousel.component';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from '../auth.guard';
import { ChartModule } from 'angular-highcharts';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TemperatureComponent } from './temperature/temperature.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  
  { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard],data: {roles: ["user"]} },
  { path: 'forms', component: FormsComponent ,canActivate:[AuthGuard],data: {roles: ["user"]}},
  { path: 'buttons', component: ButtonsComponent ,canActivate:[AuthGuard],data: {roles: ["user"]}},
  { path: 'tables', component: TablesComponent ,canActivate:[AuthGuard],data: {roles: ["user"]}},
  { path: 'icons', component: IconsComponent ,canActivate:[AuthGuard],data: {roles: ["user"]}},
  { path: 'typography', component: TypographyComponent ,canActivate:[AuthGuard],data: {roles: ["user"]}},
  { path: 'alerts', component: AlertsComponent ,canActivate:[AuthGuard],data: {roles: ["user"]}},
  { path: 'accordions', component: AccordionsComponent ,canActivate:[AuthGuard],data: {roles: ["user"]}},
  { path: 'badges', component: BadgesComponent ,canActivate:[AuthGuard],data: {roles: ["user"]}},
  { path: 'temperature', component: TemperatureComponent ,canActivate:[AuthGuard],data: {roles: ["user"]}},
  { path: 'breadcrumbs', component: BreadcrumbsComponent ,canActivate:[AuthGuard],data: {roles: ["user"]}},
  { path: 'pagination', component: PaginationComponent ,canActivate:[AuthGuard],data: {roles: ["user"]}},
  { path: 'dropdowns', component: DropdownComponent ,canActivate:[AuthGuard],data: {roles: ["user"]}},
  { path: 'tooltips', component: TooltipsComponent ,canActivate:[AuthGuard],data: {roles: ["user"]}},
  { path: 'carousel', component: CarouselComponent ,canActivate:[AuthGuard],data: {roles: ["user"]}},
  { path: 'contact', component: ContactComponent ,canActivate:[AuthGuard],data: {roles: ["user"]}},
  
];

@NgModule({
  declarations: [
    PagesComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    FormsComponent,
    ButtonsComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    AlertsComponent,
    AccordionsComponent,
    BadgesComponent,
    TemperatureComponent,
    BreadcrumbsComponent,
    PaginationComponent,
    DropdownComponent,
    TooltipsComponent,
    CarouselComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    ChartModule,
    FormsModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes),
    
  ],
  exports: [RouterModule]
})
export class PagesModule { }
