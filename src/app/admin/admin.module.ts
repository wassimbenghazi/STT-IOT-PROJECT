import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TablesComponent } from './tables/tables.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { AdminAlertsComponent } from './admin-alerts/admin-alerts.component';
import { AdminContactsComponent } from './admin-contacts/admin-contacts.component';
import { BadgesComponent } from './badges/badges.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { TabsComponent } from './tabs/tabs.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatTableModule} from '@angular/material/table';
import { AuthGuard } from '../auth.guard';
import { AdminGuard } from '../admin.guard';
import { ClientListComponent, DialogOverviewExampleDialog } from './client-list/client-list.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';




const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent ,canActivate:[AuthGuard],data: {roles: ["admin"]}},
  { path: 'client-list', component: ClientListComponent ,canActivate:[AdminGuard],data: {roles: "client-list"}},
  { path: 'buttons', component: ButtonsComponent ,canActivate:[AdminGuard],data: {roles: "admin-buttons"}},
  { path: 'admin-list', component: AdminListComponent ,canActivate:[AdminGuard],data: {roles: "admin-list"}},
  { path: 'tables', component: TablesComponent ,canActivate:[AdminGuard],data: {roles: ["admin-tabels"]}},
  { path: 'icons', component: IconsComponent ,canActivate:[AdminGuard],data: {roles: ["admin-icons"]}},
  { path: 'typography', component: TypographyComponent ,canActivate:[AdminGuard],data: {roles: ["admin-typography"]}},
  { path: 'admin-alerts', component: AdminAlertsComponent ,canActivate:[AdminGuard],data: {roles: "admin-alerts"}},
  { path: 'admin-contacts', component: AdminContactsComponent ,canActivate:[AdminGuard],data: {roles: "admin-contacts"}},
  { path: 'badges', component: BadgesComponent ,canActivate:[AdminGuard],data: {roles: ["admin-badges"]}},
  { path: 'progressbar', component: ProgressbarComponent ,canActivate:[AdminGuard],data: {roles: ["admin-progressbar"]}},
  { path: 'breadcrumbs', component: BreadcrumbsComponent ,canActivate:[AdminGuard],data: {roles: ["admin-breadcrumbs"]}},
  { path: 'pagination', component: PaginationComponent ,canActivate:[AdminGuard],data: {roles: ["admin-pagination"]}},
  { path: 'dropdowns', component: DropdownComponent ,canActivate:[AdminGuard],data: {roles: ["admin-dropdowns"]}},
  { path: 'tooltips', component: TooltipsComponent ,canActivate:[AdminGuard],data: {roles: ["admin-tooltips"]}},

  { path: 'tabs', component: TabsComponent,canActivate:[AdminGuard],data: {roles: ["admin-tabs"]} },
  
];

@NgModule({
  declarations: [
    AdminComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    ClientListComponent,
    ButtonsComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    AdminAlertsComponent,
    AdminContactsComponent,
    BadgesComponent,
    ProgressbarComponent,
    BreadcrumbsComponent,
    PaginationComponent,
    DropdownComponent,
    TooltipsComponent,
    AdminListComponent,
    TabsComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSlideToggleModule,
    NgbModule,
    MatTooltipModule,
    
    RouterModule.forChild(routes),
    
  ],
  entryComponents: [
    DialogOverviewExampleDialog
 ],
  exports: [RouterModule]
})
export class AdminModule { }
