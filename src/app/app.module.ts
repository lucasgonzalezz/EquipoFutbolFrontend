//-Angular-
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//-Angular material-
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
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
//--
import { MenuUnroutedComponent } from './components/shared/menu-unrouted/menu-unrouted.component';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [
    TrimPipe,
    AppComponent,
    MenuUnroutedComponent,
  ],
  imports: [
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
    //--
    MenubarModule,
  ],
  providers: [
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