import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environment/environment';
import { IJugador, IJugadorPage } from '../model/model.interfaces';

@Injectable()
export class JugadorAjaxService {

    sUrl: string = API_URL + "/jugador";

    constructor(
        private oHttpClient: HttpClient
    ) { }

    getOne(id: number): Observable<IJugador> {
        return this.oHttpClient.get<IJugador>(this.sUrl + "/" + id);
    }

    getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string, id_equipo: number): Observable<IJugadorPage> {
        if (!size) size = 10;
        if (!page) page = 0;
        let strUrlEquipo = "";
        if (id_equipo > 0) {
            strUrlEquipo = "&equipo=" + id_equipo;
        }
        return this.oHttpClient.get<IJugadorPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection + strUrlEquipo);
    }

    removeOne(id: number | undefined): Observable<number> {
        if (id) {
            return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
        } else {
            return new Observable<number>();
        }
    }

    newOne(oJugador: IJugador): Observable<IJugador> {
        return this.oHttpClient.post<IJugador>(this.sUrl, oJugador);
    }

    updateOne(oJugador: IJugador): Observable<IJugador> {
        return this.oHttpClient.put<IJugador>(this.sUrl, oJugador);
    }

    generateRandom(amount: number): Observable<number> {
        return this.oHttpClient.post<number>(this.sUrl + "/populate/" + amount, null);
    }

}