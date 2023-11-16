import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-miembroCuerpoTecnico-view-routed',
  templateUrl: './admin-miembroCuerpoTecnico-view-routed.component.html',
  styleUrls: ['./admin-miembroCuerpoTecnico-view-routed.component.css']
})
export class AdminMiembroCuerpoTecnicoViewRoutedComponent implements OnInit {

  id: number = 1;

  constructor(private oActivatedRoute: ActivatedRoute) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
  }

}
