import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IJugador } from 'src/app/model/model.interfaces';

@Component({
  selector: 'app-home-routed',
  templateUrl: './home-routed.component.html',
  styleUrls: ['./home-routed.component.css']
})
export class HomeRoutedComponent implements OnInit {

  idJugador: number = 0;
  reloadJugadores: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onJugadorChange(oJugador: IJugador) {
    this.idJugador = oJugador.id;
  }

}