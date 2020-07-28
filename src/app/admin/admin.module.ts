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
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { CarouselComponent } from './carousel/carousel.component';
import { TabsComponent } from './tabs/tabs.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from '../auth.guard';
import { AdminGuard } from '../admin.guard';

const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent ,canActivate:[AuthGuard],data: {roles: ["admin"]}},
  { path: 'forms', component: FormsComponent ,canActivate:[AdminGuard],data: {roles: "admin-forms"}},
  { path: 'buttons', component: ButtonsComponent ,canActivate:[AdminGuard],data: {roles: "admin-buttons"}},
  { path: 'tables', component: TablesComponent ,canActivate:[AdminGuard],data: {roles: ["admin-tabels"]}},
  { path: 'icons', component: IconsComponent ,canActivate:[AdminGuard],data: {roles: ["admin-icons"]}},
  { path: 'typography', component: TypographyComponent ,canActivate:[AdminGuard],data: {roles: ["admin-typography"]}},
  { path: 'alerts', component: AlertsComponent ,canActivate:[AdminGuard],data: {roles: ["admin-alerts"]}},
  { path: 'accordions', component: AccordionsComponent ,canActivate:[AdminGuard],data: {roles: ["admin-accordions"]}},
  { path: 'badges', component: BadgesComponent ,canActivate:[AdminGuard],data: {roles: ["admin-badges"]}},
  { path: 'progressbar', component: ProgressbarComponent ,canActivate:[AdminGuard],data: {roles: ["admin-progressbar"]}},
  { path: 'breadcrumbs', component: BreadcrumbsComponent ,canActivate:[AdminGuard],data: {roles: ["admin-breadcrumbs"]}},
  { path: 'pagination', component: PaginationComponent ,canActivate:[AdminGuard],data: {roles: ["admin-pagination"]}},
  { path: 'dropdowns', component: DropdownComponent ,canActivate:[AdminGuard],data: {roles: ["admin-dropdowns"]}},
  { path: 'tooltips', component: TooltipsComponent ,canActivate:[AdminGuard],data: {roles: ["admin-tooltips"]}},
  { path: 'carousel', component: CarouselComponent ,canActivate:[AdminGuard],data: {roles: ["admin-carousel"]}},
  { path: 'tabs', component: TabsComponent,canActivate:[AdminGuard],data: {roles: ["admin-tabs"]} },
  
];

@NgModule({
  declarations: [
    AdminComponent,
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
    ProgressbarComponent,
    BreadcrumbsComponent,
    PaginationComponent,
    DropdownComponent,
    TooltipsComponent,
    CarouselComponent,
    TabsComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(routes),
    
  ],
  exports: [RouterModule]
})
export class AdminModule { }
