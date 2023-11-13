import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionAjaxService } from 'src/app/service/session.ajax.service';

@Component({
  selector: 'app-logout-routed',
  templateUrl: './logout-routed.component.html',
  styleUrls: ['./logout-routed.component.css']
})

export class LogoutRoutedComponent implements OnInit {

  constructor(
    private oSessionService: SessionAjaxService,
    private oMatSnackBar: MatSnackBar,
    private oRouter: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.oSessionService.logout();
    this.oSessionService.emit({ type: 'logout' });
    this.oMatSnackBar.open("Logout successfull.", '', { duration: 2000 });
    this.oRouter.navigate(['/home']);
  }

  cancel() {
    this.oRouter.navigate(['/home']);
  }

}