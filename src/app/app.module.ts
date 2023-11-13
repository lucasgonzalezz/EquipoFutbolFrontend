//-Angular-
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//-Angular material-
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//-Prime NG-
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
//-Pipes-
import { TrimPipe } from './pipes/trim.pipe';
//-Interceptor-
import { AuthInterceptor } from './interceptor/auth.interceptor';
//-Services-
import { CryptoService } from './service/crypto.service';
import { EquipoAjaxService } from './service/equipo.ajax.service';
import { JugadorAjaxService } from './service/jugador.ajax.service';
import { SessionAjaxService } from './service/session.ajax.service';
import { MiembroCuerpoTecnicoAjaxService } from './service/miembroCuerpoTecnico.ajax.service';
//-Menu-
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { LoginRoutedComponent } from './components/shared/login-routed/login-routed.component';
import { MenuUnroutedComponent } from './components/shared/menu-unrouted/menu-unrouted.component';
import { LogoutRoutedComponent } from './components/shared/logout-routed/logout-routed.component';
import { FooterUnroutedComponent } from './components/shared/footer-unrouted/footer-unrouted.component';
//-Equipo-
import { AdminEquipoNewRoutedComponent } from './components/equipo/admin-equipo-new-routed/admin-equipo-new-routed.component';
import { AdminEquipoViewRoutedComponent } from './components/equipo/admin-equipo-view-routed/admin-equipo-view-routed.component';
import { AdminEquipoEditRoutedComponent } from './components/equipo/admin-equipo-edit-routed/admin-equipo-edit-routed.component';
import { AdminEquipoPlistRoutedComponent } from './components/equipo/admin-equipo-plist-routed/admin-equipo-plist-routed.component';
import { AdminEquipoFormUnroutedComponent } from './components/equipo/admin-equipo-form-unrouted/admin-equipo-form-unrouted.component';
import { AdminEquipoPlistUnroutedComponent } from './components/equipo/admin-equipo-plist-unrouted/admin-equipo-plist-unrouted.component';
import { AdminEquipoDetailUnroutedComponent } from './components/equipo/admin-equipo-detail-unrouted/admin-equipo-detail-unrouted.component';
import { UserEquipoFeaturedUnroutedComponent } from './components/equipo/user-equipo-featured-unrouted/user-equipo-featured-unrouted.component';
import { AdminEquipoSelectionUnroutedComponent } from './components/equipo/admin-equipo-selection-unrouted/admin-equipo-selection-unrouted.component';
//-Jugador-
import { AdminJugadorNewRoutedComponent } from './components/jugador/admin-jugador-new-routed/admin-jugador-new-routed.component';
import { AdminJugadorViewRoutedComponent } from './components/jugador/admin-jugador-view-routed/admin-jugador-view-routed.component';
import { AdminJugadorEditRoutedComponent } from './components/jugador/admin-jugador-edit-routed/admin-jugador-edit-routed.component';
import { AdminJugadorPlistRoutedComponent } from './components/jugador/admin-jugador-plist-routed/admin-jugador-plist-routed.component';
import { AdminJugadorFormUnroutedComponent } from './components/jugador/admin-jugador-form-unrouted/admin-jugador-form-unrouted.component';
import { UserJugadorPlistUnroutedComponent } from './components/jugador/user-jugador-plist-unrouted/user-jugador-plist-unrouted.component';
import { AdminJugadorPlistUnroutedComponent } from './components/jugador/admin-jugador-plist-unrouted/admin-jugador-plist-unrouted.component';
import { AdminJugadorDetailUnroutedComponent } from './components/jugador/admin-jugador-detail-unrouted/admin-jugador-detail-unrouted.component';
import { UserJugadorFeaturedUnroutedComponent } from './components/jugador/user-jugador-featured-unrouted/user-jugador-featured-unrouted.component';
import { AdminJugadorSelectionUnroutedComponent } from './components/jugador/admin-jugador-selection-unrouted/admin-jugador-selection-unrouted.component';
//-Miembro Cuerpo Tecnico-
import { AdminMiembroCuerpoTecnicoNewRoutedComponent } from './components/miembroCuerpoTecnico/admin-miembroCuerpoTecnico-new-routed/admin-miembroCuerpoTecnico-new-routed.component';
import { AdminMiembroCuerpoTecnicoViewRoutedComponent } from './components/miembroCuerpoTecnico/admin-miembroCuerpoTecnico-view-routed/admin-miembroCuerpoTecnico-view-routed.component';
import { AdminMiembroCuerpoTecnicoEditRoutedComponent } from './components/miembroCuerpoTecnico/admin-miembroCuerpoTecnico-edit-routed/admin-miembroCuerpoTecnico-edit-routed.component';
import { AdminMiembroCuerpoTecnicoPlistRoutedComponent } from './components/miembroCuerpoTecnico/admin-miembroCuerpoTecnico-plist-routed/admin-miembroCuerpoTecnico-plist-routed.component';
import { AdminMiembroCuerpoTecnicoFormUnroutedComponent } from './components/miembroCuerpoTecnico/admin-miembroCuerpoTecnico-form-unrouted/admin-miembroCuerpoTecnico-form-unrouted.component';
import { UserMiembroCuerpoTecnicoPlistUnroutedComponent } from './components/miembroCuerpoTecnico/user-miembroCuerpoTecnico-plist-unrouted/user-miembroCuerpoTecnico-plist-unrouted.component';
import { AdminMiembroCuerpoTecnicoPlistUnroutedComponent } from './components/miembroCuerpoTecnico/admin-miembroCuerpoTecnico-plist-unrouted/admin-miembroCuerpoTecnico-plist-unrouted.component';
import { AdminMiembroCuerpoTecnicoDetailUnroutedComponent } from './components/miembroCuerpoTecnico/admin-miembroCuerpoTecnico-detail-unrouted/admin-miembroCuerpoTecnico-detail-unrouted.component';
import { UserMiembroCuerpoTecnicoFeaturedUnroutedComponent } from './components/miembroCuerpoTecnico/user-miembroCuerpoTecnico-featured-unrouted/user-miembroCuerpoTecnico-featured-unrouted.component';
import { AdminMiembroCuerpoTecnicoSelectionUnroutedComponent } from './components/miembroCuerpoTecnico/admin-miembroCuerpoTecnico-selection-unrouted/admin-miembroCuerpoTecnico-selection-unrouted.component';

@NgModule({
  declarations: [
    //-General-
    TrimPipe,
    AppComponent,
    HomeRoutedComponent,
    LoginRoutedComponent,
    LogoutRoutedComponent,
    MenuUnroutedComponent,
    MenuUnroutedComponent,
    FooterUnroutedComponent,
    //-Equipo-
    AdminEquipoNewRoutedComponent,
    AdminEquipoEditRoutedComponent,
    AdminEquipoViewRoutedComponent,
    AdminEquipoPlistRoutedComponent,
    AdminEquipoFormUnroutedComponent,
    AdminEquipoPlistUnroutedComponent,
    AdminEquipoDetailUnroutedComponent,
    UserEquipoFeaturedUnroutedComponent,
    AdminEquipoSelectionUnroutedComponent,
    //-Jugador-
    AdminJugadorNewRoutedComponent,
    AdminJugadorViewRoutedComponent,
    AdminJugadorEditRoutedComponent,
    AdminJugadorPlistRoutedComponent,
    UserJugadorPlistUnroutedComponent,
    AdminJugadorFormUnroutedComponent,
    AdminJugadorPlistUnroutedComponent,
    AdminJugadorDetailUnroutedComponent,
    UserJugadorFeaturedUnroutedComponent,
    AdminJugadorSelectionUnroutedComponent,
    //-Miembro Cuerpo Tecnico-
    AdminMiembroCuerpoTecnicoNewRoutedComponent,
    AdminMiembroCuerpoTecnicoViewRoutedComponent,
    AdminMiembroCuerpoTecnicoEditRoutedComponent,
    AdminMiembroCuerpoTecnicoPlistRoutedComponent,
    UserMiembroCuerpoTecnicoPlistUnroutedComponent,
    AdminMiembroCuerpoTecnicoFormUnroutedComponent,
    AdminMiembroCuerpoTecnicoPlistUnroutedComponent,
    AdminMiembroCuerpoTecnicoDetailUnroutedComponent,
    UserMiembroCuerpoTecnicoFeaturedUnroutedComponent,
    AdminMiembroCuerpoTecnicoSelectionUnroutedComponent,
  ],
  imports: [
    //--
    FormsModule,
    BrowserModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    //--
    TableModule,
    PaginatorModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    //--
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  providers: [
    //--
    MatSnackBar,
    //-Services-
    CryptoService,
    DialogService,
    MessageService,
    EquipoAjaxService,
    SessionAjaxService,
    JugadorAjaxService,
    ConfirmationService,
    MiembroCuerpoTecnicoAjaxService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }