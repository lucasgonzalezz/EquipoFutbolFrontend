import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-equipo-edit-routed',
  templateUrl: './admin-equipo-edit-routed.component.html',
  styleUrls: ['./admin-equipo-edit-routed.component.css']
})
export class AdminEquipoEditRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
  }
}