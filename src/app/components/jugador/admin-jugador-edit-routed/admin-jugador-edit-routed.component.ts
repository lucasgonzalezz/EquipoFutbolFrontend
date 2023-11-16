import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-jugador-edit-routed',
  templateUrl: './admin-jugador-edit-routed.component.html',
  styleUrls: ['./admin-jugador-edit-routed.component.css']
})
export class AdminJugadorEditRoutedComponent implements OnInit {
  
  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
  }
}
