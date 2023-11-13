import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//-Menu-
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { LoginRoutedComponent } from './components/shared/login-routed/login-routed.component';
import { LogoutRoutedComponent } from './components/shared/logout-routed/logout-routed.component';
//-Equipo-
import { AdminEquipoNewRoutedComponent } from './components/equipo/admin-equipo-new-routed/admin-equipo-new-routed.component';
import { AdminEquipoViewRoutedComponent } from './components/equipo/admin-equipo-view-routed/admin-equipo-view-routed.component';
import { AdminEquipoEditRoutedComponent } from './components/equipo/admin-equipo-edit-routed/admin-equipo-edit-routed.component';
import { AdminEquipoPlistRoutedComponent } from './components/equipo/admin-equipo-plist-routed/admin-equipo-plist-routed.component';
//-Jugador-
import { AdminJugadorNewRoutedComponent } from './components/jugador/admin-jugador-new-routed/admin-jugador-new-routed.component';
import { AdminJugadorEditRoutedComponent } from './components/jugador/admin-jugador-edit-routed/admin-jugador-edit-routed.component';
import { AdminJugadorViewRoutedComponent } from './components/jugador/admin-jugador-view-routed/admin-jugador-view-routed.component';
import { AdminJugadorPlistRoutedComponent } from './components/jugador/admin-jugador-plist-routed/admin-jugador-plist-routed.component';
//-Miembro Cuerpo Tecnico-
import { AdminMiembroCuerpoTecnicoNewRoutedComponent } from './components/miembroCuerpoTecnico/admin-miembroCuerpoTecnico-new-routed/admin-miembroCuerpoTecnico-new-routed.component';
import { AdminMiembroCuerpoTecnicoEditRoutedComponent } from './components/miembroCuerpoTecnico/admin-miembroCuerpoTecnico-edit-routed/admin-miembroCuerpoTecnico-edit-routed.component';
import { AdminMiembroCuerpoTecnicoViewRoutedComponent } from './components/miembroCuerpoTecnico/admin-miembroCuerpoTecnico-view-routed/admin-miembroCuerpoTecnico-view-routed.component';
import { AdminMiembroCuerpoTecnicoPlistRoutedComponent } from './components/miembroCuerpoTecnico/admin-miembroCuerpoTecnico-plist-routed/admin-miembroCuerpoTecnico-plist-routed.component';

const routes: Routes = [
  //-Menu-
  { path: '', component: HomeRoutedComponent },
  { path: 'home', component: HomeRoutedComponent },
  { path: 'login', component: LoginRoutedComponent },
  { path: 'logout', component: LogoutRoutedComponent },
  //-Equipo-
  { path: 'admin/equipo/new', component: AdminEquipoEditRoutedComponent },
  { path: 'admin/equipo/plist', component: AdminEquipoViewRoutedComponent },
  { path: 'admin/equipo/edit/:id', component: AdminEquipoNewRoutedComponent },
  { path: 'admin/equipo/view/:id', component: AdminEquipoPlistRoutedComponent },
  //-Jugador-
  { path: 'admin/jugador/new', component: AdminJugadorNewRoutedComponent },
  { path: 'admin/jugador/plist', component: AdminJugadorPlistRoutedComponent },
  { path: 'admin/jugador/view/:id', component: AdminJugadorViewRoutedComponent },
  { path: 'admin/jugador/edit/:id', component: AdminJugadorEditRoutedComponent },
  { path: 'admin/jugador/plist/byequipo/:id', component: AdminJugadorPlistRoutedComponent },
  //-Miembro Cuerpo Tecnico-
  { path: 'admin/miembroCuerpoTecnico/new', component: AdminMiembroCuerpoTecnicoNewRoutedComponent },
  { path: 'admin/miembroCuerpoTecnico/plist', component: AdminMiembroCuerpoTecnicoPlistRoutedComponent },
  { path: 'admin/miembroCuerpoTecnico/view/:id', component: AdminMiembroCuerpoTecnicoViewRoutedComponent },
  { path: 'admin/miembroCuerpoTecnico/edit/:id', component: AdminMiembroCuerpoTecnicoEditRoutedComponent },
  { path: 'admin/miembroCuerpoTecnico/plist/byequipo/:id', component: AdminMiembroCuerpoTecnicoPlistRoutedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }