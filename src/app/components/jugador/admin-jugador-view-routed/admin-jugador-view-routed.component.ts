import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-jugador-view-routed',
  templateUrl: './admin-jugador-view-routed.component.html',
  styleUrls: ['./admin-jugador-view-routed.component.css']
})
export class AdminJugadorViewRoutedComponent implements OnInit {

  id: number = 1;

  constructor(private oActivatedRoute: ActivatedRoute) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
  }
}