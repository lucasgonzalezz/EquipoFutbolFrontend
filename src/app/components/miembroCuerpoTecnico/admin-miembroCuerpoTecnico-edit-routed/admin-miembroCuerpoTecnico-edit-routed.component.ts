import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-miembroCuerpoTecnico-edit-routed',
  templateUrl: './admin-miembroCuerpoTecnico-edit-routed.component.html',
  styleUrls: ['./admin-miembroCuerpoTecnico-edit-routed.component.css']
})
export class AdminMiembroCuerpoTecnicoEditRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
  }
}